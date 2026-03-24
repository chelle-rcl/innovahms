from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from database.db import get_db_connection

superadmin_bp = Blueprint('superadmin', __name__)

@superadmin_bp.route('/api/superadmin/login', methods=['POST'])
def superadmin_login():
    data = request.json or {}
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and security key are required"}), 400

    conn = None 
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, first_name, last_name, email, password_hash FROM superadmins WHERE email = %s", (email,))
        admin = cur.fetchone()
        cur.close()

        if admin:
            admin_id, f_name, l_name, admin_email, hashed_pw = admin
            if check_password_hash(hashed_pw, password):
                return jsonify({
                    "message": "Access Authorized.",
                    "user": {
                        "id": admin_id,
                        "name": f"{f_name} {l_name}",
                        "role": "superadmin"
                    }
                }), 200
                
        return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": "System error occurred"}), 500
    finally:
        if conn:
            conn.close() 