from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import send_from_directory
import psycopg2
from werkzeug.security import generate_password_hash, check_password_hash
import os
from werkzeug.utils import secure_filename
import json

app = Flask(__name__, static_folder='static')
CORS(app)

def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        database="innovahmsdb",
        user="postgres",
        password="12345"
    )

UPLOAD_FOLDER = 'static/uploads/rooms'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

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
        cur.execute("""
            SELECT id, room_number, room_name, room_type, price_per_night, status, 
                   description, amenities, images, max_adults, max_children 
            FROM rooms 
            WHERE hotel_id = %s 
            ORDER BY room_number
        """, (hotel_id,))
        rooms = cur.fetchall()
        cur.close()
        conn.close()
        
        room_list = []
        for r in rooms:
            room_list.append({
                "id": r[0], 
                "roomNumber": r[1], 
                "roomName": r[2] or "",
                "roomType": r[3], 
                "price": float(r[4]), 
                "status": r[5],
                "description": r[6] or "",
                "amenities": r[7] if r[7] else [],
                "images": r[8] if r[8] else [],
                "maxAdults": r[9],
                "maxChildren": r[10]
            })
        return jsonify(room_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/owner/rooms/add', methods=['POST'])
def add_room():
    try:
        # 1. Get text data from request.form
        hotel_id = request.form.get('hotelId')
        room_number = request.form.get('roomNumber')
        room_name = request.form.get('roomName')
        room_type = request.form.get('roomType')
        price = request.form.get('price')
        description = request.form.get('description')
        max_adults = request.form.get('maxAdults')
        max_children = request.form.get('maxChildren')
        amenities = json.loads(request.form.get('amenities', '[]'))

        # 2. Handle File Uploads
        uploaded_files = request.files.getlist('images')
        saved_image_paths = []
        
        for file in uploaded_files:
            if file.filename != '':
                filename = secure_filename(f"h{hotel_id}_r{room_number}_{file.filename}")
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                # Store the URL path for the frontend
                saved_image_paths.append(f"/static/uploads/rooms/{filename}")

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO rooms (
                hotel_id, room_number, room_name, room_type, 
                price_per_night, description, amenities, images, 
                max_adults, max_children, status
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            hotel_id, room_number, room_name, room_type,
            price, description, amenities, saved_image_paths, 
            max_adults, max_children, 'Available'
        ))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Room added with images!"}), 201
    except Exception as e:
        print(f"Upload error: {e}")
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
    try:
        hotel_id = request.form.get('hotelId')
        room_number = request.form.get('roomNumber')
        room_name = request.form.get('roomName')
        room_type = request.form.get('roomType')
        price = request.form.get('price')
        description = request.form.get('description')
        max_adults = request.form.get('maxAdults')
        max_children = request.form.get('maxChildren')
        amenities = json.loads(request.form.get('amenities', '[]'))
        
        existing_images = request.form.getlist('existing_images')

        conn = get_db_connection()
        cur = conn.cursor()

        # 1. Get current images from DB
        cur.execute("SELECT images FROM rooms WHERE id = %s", (room_id,))
        db_result = cur.fetchone()
        
        # Initialize this outside so it's always available
        images_to_keep = set()
        raw_existing = request.form.getlist('existing_images')
        
        for url in raw_existing:
            if 'http' in url:
                path_only = '/' + url.split('/', 3)[-1] 
                images_to_keep.add(path_only)
            else:
                # Ensure it starts with / for consistency
                clean_path = url if url.startswith('/') else '/' + url
                images_to_keep.add(clean_path)

        if db_result and db_result[0]:
            old_images_in_db = db_result[0] 
            for old_img in old_images_in_db:
                if old_img not in images_to_keep:
                    relative_path = old_img.lstrip('/')
                    full_path = os.path.join(app.root_path, relative_path)
                    if os.path.exists(full_path):
                        os.remove(full_path)

        # 2. Handle new file uploads
        new_files = request.files.getlist('images')
        saved_new_paths = []
        
        for file in new_files:
            if file.filename != '':
                filename = secure_filename(f"h{hotel_id}_r{room_number}_{file.filename}")
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                saved_new_paths.append(f"/static/uploads/rooms/{filename}")

        final_images = list(images_to_keep) + saved_new_paths

        cur.execute("""
            UPDATE rooms SET 
                room_number = %s, room_name = %s, room_type = %s, 
                price_per_night = %s, description = %s, amenities = %s,
                images = %s, max_adults = %s, max_children = %s
            WHERE id = %s
        """, (
            room_number, room_name, room_type, 
            price, description, amenities, 
            final_images, max_adults, max_children, room_id
        ))
        
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Room updated and storage cleaned!"}), 200
    except Exception as e:
        print(f"Update error: {e}")
        return jsonify({"error": str(e)}), 400
    
@app.route('/api/owner/rooms/delete/<int:room_id>', methods=['DELETE'])
def delete_room(room_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("SELECT images FROM rooms WHERE id = %s", (room_id,))
        result = cur.fetchone()
        
        if result:
            images_to_delete = result[0] 
            
            for image_url in images_to_delete:
                relative_path = image_url.lstrip('/') 
                full_path = os.path.join(app.root_path, relative_path)

                if os.path.exists(full_path):
                    os.remove(full_path)
                    print(f"Successfully deleted: {full_path}")
                else:
                    print(f"File not found, skipping: {full_path}")

        cur.execute("DELETE FROM rooms WHERE id = %s", (room_id,))
        
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Room and associated images deleted successfully"}), 200
    except Exception as e:
        print(f"Delete error: {e}")
        return jsonify({"error": str(e)}), 400

@app.route('/static/uploads/rooms/<path:filename>')
def serve_room_images(filename):
    return send_from_directory(os.path.join('static', 'uploads', 'rooms'), filename)

if __name__ == "__main__":
    app.run(debug=True)