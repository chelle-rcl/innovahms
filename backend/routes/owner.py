from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
import json
from database.db import get_db_connection

owner_bp = Blueprint('owner', __name__)

@owner_bp.route('/api/owner/signup', methods=['POST'])
def owner_signup():
    data = request.json
    f_name = data.get('firstName')
    l_name = data.get('lastName')
    email = data.get('email')
    contact = data.get('contactNumber')
    password = data.get('password')
    hotel_name = data.get('hotelName')
    hotel_address = data.get('hotelAddress')

    hashed_pw = generate_password_hash(password)

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute(
            "INSERT INTO owners (first_name, last_name, email, contact_number, password_hash) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (f_name, l_name, email, contact, hashed_pw)
        )
        owner_id = cur.fetchone()[0]

        cur.execute(
            "INSERT INTO hotels (owner_id, hotel_name, hotel_address) VALUES (%s, %s, %s)",
            (owner_id, hotel_name, hotel_address)
        )
        
        conn.commit()
        cur.close()
        conn.close()

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
    
@owner_bp.route('/api/owner/login', methods=['POST'])
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
    
@owner_bp.route('/api/owner/rooms/<int:hotel_id>', methods=['GET'])
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
    
@owner_bp.route('/api/owner/rooms/add', methods=['POST'])
def add_room():
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

        uploaded_files = request.files.getlist('images')
        saved_image_paths = []
        
        for file in uploaded_files:
            if file.filename != '':
                filename = secure_filename(f"h{hotel_id}_r{room_number}_{file.filename}")
                file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
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
    
@owner_bp.route('/api/owner/rooms/update-status', methods=['PUT'])
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
    
@owner_bp.route('/api/owner/rooms/update/<int:room_id>', methods=['PUT'])
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

        cur.execute("SELECT images FROM rooms WHERE id = %s", (room_id,))
        db_result = cur.fetchone()
        
        images_to_keep = set()
        raw_existing = request.form.getlist('existing_images')
        
        for url in raw_existing:
            if 'http' in url:
                path_only = '/' + url.split('/', 3)[-1] 
                images_to_keep.add(path_only)
            else:
                clean_path = url if url.startswith('/') else '/' + url
                images_to_keep.add(clean_path)

        if db_result and db_result[0]:
            old_images_in_db = db_result[0] 
            for old_img in old_images_in_db:
                if old_img not in images_to_keep:
                    relative_path = old_img.lstrip('/')
                    full_path = os.path.join(current_app.root_path, relative_path)
                    if os.path.exists(full_path):
                        os.remove(full_path)

        new_files = request.files.getlist('images')
        saved_new_paths = []
        
        for file in new_files:
            if file.filename != '':
                filename = secure_filename(f"h{hotel_id}_r{room_number}_{file.filename}")
                file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
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
    
@owner_bp.route('/api/owner/rooms/delete/<int:room_id>', methods=['DELETE'])
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
                full_path = os.path.join(current_app.root_path, relative_path)

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