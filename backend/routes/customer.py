from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import requests
from database.db import get_db_connection

customer_bp = Blueprint('customer', __name__)
GOOGLE_CLIENT_ID = "780199678192-krqs4tdu62ltsnb4nnq6td6mhed5mchr.apps.googleusercontent.com"

@customer_bp.route('/api/signup', methods=['POST'])
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
            "INSERT INTO customers (first_name, last_name, email, contact_number, password_hash, auth_provider) VALUES (%s, %s, %s, %s, %s, %s)",
            (first_name, last_name, email, contact, hashed_pw, 'local')
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "User created successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@customer_bp.route('/api/login', methods=['POST'])
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

@customer_bp.route('/api/google-login', methods=['POST'])
def google_login():
    data = request.json
    token = data.get('token')

    try:
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), GOOGLE_CLIENT_ID)
        email = idinfo['email']
        
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("SELECT id, first_name, last_name, email, contact_number FROM customers WHERE email = %s", (email,))
        user = cur.fetchone()

        if not user:
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')
            cur.execute(
                "INSERT INTO customers (first_name, last_name, email, auth_provider) VALUES (%s, %s, %s, %s) RETURNING id",
                (first_name, last_name, email, 'google')
            )
            user_id = cur.fetchone()[0]
            conn.commit()
            
            final_first_name = first_name
            final_last_name = last_name
            final_contact = ""
        else:
            user_id, final_first_name, final_last_name, db_email, final_contact = user

        cur.close()
        conn.close()

        return jsonify({
            "message": "Login successful!",
            "user": {
                "id": user_id,
                "firstName": final_first_name, 
                "lastName": final_last_name,
                "email": email,
                "contactNumber": final_contact
            }
        }), 200

    except ValueError:
        return jsonify({"error": "Invalid Google token"}), 400
    
@customer_bp.route('/api/facebook-login', methods=['POST'])
def facebook_login():
    data = request.json
    access_token = data.get('accessToken')

    fb_url = f"https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token={access_token}"
    fb_response = requests.get(fb_url).json()

    if 'error' in fb_response:
        return jsonify({"error": "Invalid Facebook token"}), 400

    email = fb_response.get('email')
    if not email:
        email = f"{fb_response['id']}@facebook.com" 

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("SELECT id, first_name, last_name, email, contact_number FROM customers WHERE email = %s", (email,))
        user = cur.fetchone()

        if not user:
            first_name = fb_response.get('first_name', '')
            last_name = fb_response.get('last_name', '')
            cur.execute(
                "INSERT INTO customers (first_name, last_name, email, auth_provider) VALUES (%s, %s, %s, %s) RETURNING id",
                (first_name, last_name, email, 'facebook')
            )
            user_id = cur.fetchone()[0]
            conn.commit()
            final_first_name, final_last_name, final_contact = first_name, last_name, ""
        else:
            user_id, final_first_name, final_last_name, _, final_contact = user

        cur.close()
        conn.close()

        return jsonify({
            "message": "Login successful!",
            "user": {
                "id": user_id,
                "firstName": final_first_name, 
                "lastName": final_last_name,
                "email": email,
                "contactNumber": final_contact
            }
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@customer_bp.route('/api/user/update', methods=['PUT'])
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

@customer_bp.route('/api/user/change-password', methods=['PUT'])
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
        
        existing_hash = result[0] if result else None
        new_hashed_pw = generate_password_hash(new_password)

        if existing_hash is None or existing_hash == "":
            cur.execute("UPDATE customers SET password_hash = %s WHERE id = %s", (new_hashed_pw, user_id))
            conn.commit()
            return jsonify({"message": "Password set successfully!"}), 200
        
        elif check_password_hash(existing_hash, current_password):
            cur.execute("UPDATE customers SET password_hash = %s WHERE id = %s", (new_hashed_pw, user_id))
            conn.commit()
            return jsonify({"message": "Password updated successfully!"}), 200
        
        else:
            return jsonify({"error": "Current password incorrect"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        if cur: cur.close()
        if conn: conn.close()

@customer_bp.route('/api/search-rooms', methods=['GET'])
def search_rooms():
    # Get parameters from the request
    location = request.args.get('location', '')
    adults = int(request.args.get('adults', 1))
    children = int(request.args.get('children', 0))
    # Note: Check-in/out logic would usually check a 'bookings' table for conflicts.
    # For now, we filter by the 'Available' status and capacity.

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # SQL Logic: Filter by location (ILIKE for case-insensitive), 
        # status, and capacity (adults + children)
        query = """
            SELECT 
                r.id, r.room_number, r.room_name, r.room_type, 
                r.price_per_night, r.max_adults, r.max_children, 
                r.images, r.status, h.hotel_name, h.hotel_address
            FROM rooms r
            JOIN hotels h ON r.hotel_id = h.id
            WHERE r.status = 'Available'
              AND h.hotel_address ILIKE %s
              AND r.max_adults >= %s
              AND r.max_children >= %s
        """
        params = (f'%{location}%', adults, children)
        
        cur.execute(query, params)
        rooms = cur.fetchall()
        
        results = []
        for r in rooms:
            results.append({
                "id": r[0],
                "roomNumber": r[1],
                "roomName": r[2],
                "roomType": r[3],
                "price": float(r[4]),
                "capacity": {"adults": r[5], "children": r[6]},
                "images": r[7] if r[7] else [],
                "status": r[8],
                "hotelName": r[9],
                "location": r[10]
            })
            
        cur.close()
        conn.close()
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500