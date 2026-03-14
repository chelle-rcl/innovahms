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

# --- CUSTOMER ENDPOINTS ---

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    contact = data.get('contactNumber')
    password = data.get('password')

    hashed_pw = generate_password_hash(password)

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO customers (first_name, last_name, email, contact_number, password_hash) VALUES (%s, %s, %s, %s, %s)",
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
        cur.execute("SELECT id, first_name, last_name, email, contact_number, password_hash FROM customers WHERE email = %s", (email,))
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
        return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- OWNER ENDPOINTS ---

@app.route('/api/owner/login', methods=['POST'])
def owner_login():
    data = request.json or {}
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT o.id, o.first_name, o.last_name, o.email, o.password_hash, h.hotel_name 
            FROM owners o
            LEFT JOIN hotels h ON o.id = h.owner_id
            WHERE o.email = %s
        """, (email,))
        
        owner = cur.fetchone()
        cur.close()
        conn.close()

        if owner:
            owner_id, f_name, l_name, owner_email, hashed_pw, h_name = owner
            if check_password_hash(hashed_pw, password):
                return jsonify({
                    "message": "Owner login successful!",
                    "owner": {
                        "id": owner_id,
                        "firstName": f_name, 
                        "lastName": l_name,
                        "email": owner_email,
                        "hotelName": h_name 
                    }
                }), 200
        return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/owner/signup', methods=['POST'])
def owner_signup():
    data = request.json
    f_name = data.get('firstName')
    l_name = data.get('lastName')
    email = data.get('email')
    contact = data.get('contactNumber')
    password = data.get('password')
    hotel_name = data.get('hotelName')

    hashed_pw = generate_password_hash(password)

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # 1. Insert Owner
        cur.execute(
            "INSERT INTO owners (first_name, last_name, email, contact_number, password_hash) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (f_name, l_name, email, contact, hashed_pw)
        )
        owner_id = cur.fetchone()[0]

        # 2. Insert Hotel
        cur.execute(
            "INSERT INTO hotels (owner_id, hotel_name) VALUES (%s, %s)",
            (owner_id, hotel_name)
        )
        
        conn.commit()
        cur.close()
        conn.close()

        # UPDATED: Return owner data so the frontend can log them in immediately
        return jsonify({
            "message": "Owner and Hotel registered successfully!",
            "owner": {
                "id": owner_id,
                "firstName": f_name,
                "lastName": l_name,
                "email": email,
                "hotelName": hotel_name
            }
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- PROFILE UPDATES ---

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
            "UPDATE customers SET first_name = %s, last_name = %s, contact_number = %s WHERE id = %s",
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
        cur.execute("SELECT password_hash FROM customers WHERE id = %s", (user_id,))
        result = cur.fetchone()
        
        if result and check_password_hash(result[0], current_password):
            new_hashed_pw = generate_password_hash(new_password)
            cur.execute("UPDATE customers SET password_hash = %s WHERE id = %s", (new_hashed_pw, user_id))
            conn.commit()
            status, msg = 200, "Password updated!"
        else:
            status, msg = 401, "Current password incorrect"

        cur.close()
        conn.close()
        return jsonify({"message": msg}), status
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- ROOM MANAGEMENT ENDPOINTS ---

@app.route('/api/owner/rooms/<int:hotel_id>', methods=['GET'])
def get_rooms(hotel_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, room_number, room_type, price_per_night, status FROM rooms WHERE hotel_id = %s ORDER BY room_number", (hotel_id,))
        rooms = cur.fetchall()
        cur.close()
        conn.close()
        
        room_list = []
        for r in rooms:
            room_list.append({
                "id": r[0], "roomNumber": r[1], "roomType": r[2], "price": float(r[3]), "status": r[4]
            })
        return jsonify(room_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/owner/rooms/add', methods=['POST'])
def add_room():
    data = request.json
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO rooms (hotel_id, room_number, room_type, price_per_night, status) VALUES (%s, %s, %s, %s, %s)",
            (data['hotelId'], data['roomNumber'], data['roomType'], data['price'], 'Available')
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Room added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/owner/rooms/update-status', methods=['PUT'])
def update_room_status():
    data = request.json
    room_id = data.get('roomId')
    new_status = data.get('status')

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "UPDATE rooms SET status = %s WHERE id = %s",
            (new_status, room_id)
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": f"Room status updated to {new_status}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/api/owner/rooms/update/<int:room_id>', methods=['PUT'])
def update_room(room_id):
    data = request.json
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "UPDATE rooms SET room_number = %s, room_type = %s, price_per_night = %s WHERE id = %s",
            (data['roomNumber'], data['roomType'], data['price'], room_id)
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Room updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/api/owner/rooms/delete/<int:room_id>', methods=['DELETE'])
def delete_room(room_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("DELETE FROM rooms WHERE id = %s", (room_id,))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Room deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)