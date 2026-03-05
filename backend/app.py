from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        database="innovahmsdb",
        user="postgres",
        password="12345"
    )

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    
    # Extract data from the request
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    contact = data.get('contactNumber')
    password = data.get('password')

    # Hash the password for security
    hashed_pw = generate_password_hash(password)

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Insert user into the database
        cur.execute(
            "INSERT INTO users (first_name, last_name, email, contact_number, password_hash) VALUES (%s, %s, %s, %s, %s)",
            (first_name, last_name, email, contact, hashed_pw)
        )
        
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({"message": "User created successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Look for the user in the database
        cur.execute("SELECT id, first_name, last_name, email, contact_number, password_hash FROM users WHERE email = %s", (email,))
        user = cur.fetchone()
        
        cur.close()
        conn.close()

        if user:
            user_id, f_name, l_name, u_email, u_contact, hashed_pw = user
            if check_password_hash(hashed_pw, password):
                return jsonify({
                    "message": "Login successful!",
                    "user": {
                        "id": user_id,
                        "firstName": f_name,
                        "lastName": l_name,
                        "email": u_email,
                        "contactNumber": u_contact
                    }
                }), 200
            else:
                return jsonify({"error": "Invalid email or password"}), 401
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/update', methods=['PUT'])
def update_user():
    data = request.json
    user_id = data.get('id')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    contact = data.get('contactNumber')

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute(
            "UPDATE users SET first_name = %s, last_name = %s, contact_number = %s WHERE id = %s",
            (first_name, last_name, contact, user_id)
        )
        
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Profile updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/user/change-password', methods=['PUT'])
def change_password():
    data = request.json
    user_id = data.get('id')
    current_password = data.get('currentPassword')
    new_password = data.get('newPassword')

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # 1. Verify current password first
        cur.execute("SELECT password_hash FROM users WHERE id = %s", (user_id,))
        result = cur.fetchone()
        
        if result and check_password_hash(result[0], current_password):
            # 2. Hash and save new password
            new_hashed_pw = generate_password_hash(new_password)
            cur.execute("UPDATE users SET password_hash = %s WHERE id = %s", (new_hashed_pw, user_id))
            conn.commit()
            status, msg = 200, "Password updated!"
        else:
            status, msg = 401, "Current password incorrect"

        cur.close()
        conn.close()
        return jsonify({"message": msg}), status
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)