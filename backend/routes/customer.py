from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import requests
import base64 
import os 
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
        
        query = """
            SELECT 
                r.id, r.room_number, r.room_name, r.room_type, 
                r.price_per_night, r.max_adults, r.max_children, 
                r.images, r.status, h.hotel_name, h.hotel_address,
                r.description, r.amenities
            FROM rooms r
            JOIN hotels h ON r.hotel_id = h.id
            WHERE r.status = 'Available'
              AND h.hotel_address ILIKE %s
              AND r.max_adults >= %s
              AND r.max_children >= %s
        """
        cur.execute(query, (f'%{location}%', adults, children))
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
                "location": r[10],
                "description": r[11], 
                "amenities": r[12]    
            })
            
        cur.close()
        conn.close()
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@customer_bp.route('/api/book', methods=['POST'])
def create_booking():
    data = request.json
    customer_id = data.get('customerId')
    room_id = data.get('roomId')
    check_in = data.get('checkIn')
    check_out = data.get('checkOut')
    total_amount = data.get('totalAmount')
    adults = data.get('adults')
    children = data.get('children')
    payment_type = data.get('paymentType') # 'pay_at_hotel' or 'online'

    if not all([customer_id, room_id, check_in, check_out]):
        return jsonify({"error": "Missing booking details"}), 400

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # 1. Insert into Bookings
        cur.execute("""
            INSERT INTO bookings (customer_id, room_id, check_in_date, check_out_date, total_amount, adults, children, payment_type, booking_status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'booked')
            RETURNING id
        """, (customer_id, room_id, check_in, check_out, total_amount, adults, children, payment_type))
        
        booking_id = cur.fetchone()[0]

        # 2. Initialize a record in Payments (Status 'pending')
        cur.execute("""
            INSERT INTO payments (booking_id, amount, payment_status)
            VALUES (%s, %s, 'pending')
        """, (booking_id, total_amount))

        # 3. Optional: Update room status to 'Occupied' (or 'Booked' if you add that status)
        # cur.execute("UPDATE rooms SET status = 'Occupied' WHERE id = %s", (room_id,))

        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Booking successful!", "bookingId": booking_id}), 201

    except Exception as e:
        if conn:
            conn.rollback()
        return jsonify({"error": str(e)}), 500

@customer_bp.route('/api/user-bookings/<int:user_id>', methods=['GET'])
def get_user_bookings(user_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        query = """
            SELECT 
                b.id, 
                h.hotel_name, 
                r.room_type, 
                r.images[1] as room_image, 
                b.check_in_date, 
                b.check_out_date, 
                b.booking_status, 
                p.payment_status,
                b.payment_type,
                b.total_amount,
                r.room_name,
                b.adults,
                b.children,
                h.hotel_address,
                r.price_per_night
            FROM bookings b
            JOIN rooms r ON b.room_id = r.id
            JOIN hotels h ON r.hotel_id = h.id
            LEFT JOIN payments p ON b.id = p.booking_id
            WHERE b.customer_id = %s
            ORDER BY b.created_at DESC
        """
        cur.execute(query, (user_id,))
        rows = cur.fetchall()

        bookings = []
        for row in rows:
            bookings.append({
                "id": str(row[0]),
                "hotelName": row[1],
                "roomType": row[2],
                "roomImage": row[3] if row[3] else "/static/default-room.jpg",
                "checkIn": row[4].isoformat(),
                "checkOut": row[5].isoformat(),
                "status": row[6],
                "paymentStatus": row[7] if row[7] else "pending",
                "paymentType": row[8],
                "totalAmount": float(row[9]),
                "roomName": row[10],
                "adults": row[11],
                "children": row[12],
                "hotelAddress": row[13],
                "pricePerNight": float(row[14])
            })

        cur.close()
        conn.close()
        return jsonify(bookings), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

@customer_bp.route('/api/bookings/<int:booking_id>/cancel', methods=['PATCH'])
def cancel_booking(booking_id):
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # 1. Update booking status
        cur.execute("""
            UPDATE bookings 
            SET booking_status = 'cancelled', updated_at = CURRENT_TIMESTAMP 
            WHERE id = %s
        """, (booking_id,))

        # 2. Update payment status if it exists
        cur.execute("""
            UPDATE payments 
            SET payment_status = 'failed' 
            WHERE booking_id = %s AND payment_status = 'pending'
        """, (booking_id,))

        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Booking cancelled successfully"}), 200

    except Exception as e:
        if conn:
            conn.rollback()
        return jsonify({"error": str(e)}), 500

@customer_bp.route('/api/create-checkout', methods=['POST'])
def create_checkout():
    data = request.get_json()
    booking_id  = data.get('bookingId')
    amount      = data.get('amount')
    description = data.get('description')

    secret_key   = os.environ.get('PAYMONGO_SECRET_KEY')
    encoded_key  = base64.b64encode(f"{secret_key}:".encode()).decode()
    frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:5173')

    payload = {
        "data": {
            "attributes": {
                "send_email_receipt": False,
                "show_description": True,
                "show_line_items": True,
                "line_items": [{
                    "currency": "PHP",
                    "amount": int(float(amount) * 100),  # PHP → centavos
                    "name": description,
                    "quantity": 1
                }],
                "payment_method_types": ["card", "gcash", "paymaya"],
                "success_url": f"{frontend_url}/customer/paymentsuccess?bookingId={booking_id}",
                "cancel_url":  f"{frontend_url}/customer/paymentcancelled?bookingId={booking_id}",
                "description": description
            }
        }
    }

    response = requests.post(
        "https://api.paymongo.com/v1/checkout_sessions",
        json=payload,
        headers={
            "Authorization": f"Basic {encoded_key}",
            "Content-Type": "application/json"
        }
    )

    result = response.json()

    if response.status_code == 200:
        checkout_url = result['data']['attributes']['checkout_url']
        return jsonify({"checkout_url": checkout_url}), 200
    else:
        print("PayMongo error:", result)
        return jsonify({"error": result}), 400


@customer_bp.route('/api/bookings/<int:booking_id>/mark-paid', methods=['PATCH'])
def mark_paid(booking_id):
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            UPDATE payments 
            SET payment_status = 'paid', paid_at = CURRENT_TIMESTAMP
            WHERE booking_id = %s
        """, (booking_id,))

        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Payment marked as paid"}), 200

    except Exception as e:
        if conn: conn.rollback()
        return jsonify({"error": str(e)}), 500