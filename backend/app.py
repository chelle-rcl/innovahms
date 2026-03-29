from flask import Flask
from flask_cors import CORS
import os
import atexit
from dotenv import load_dotenv          
from apscheduler.schedulers.background import BackgroundScheduler
from routes import customer_bp, owner_bp, superadmin_bp
from database.db import get_db_connection

load_dotenv()                           

app = Flask(__name__, static_folder='static')
CORS(app)

UPLOAD_FOLDER = 'static/uploads/rooms'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.register_blueprint(customer_bp)
app.register_blueprint(owner_bp)
app.register_blueprint(superadmin_bp)

def update_booking_statuses():
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            UPDATE bookings b
            SET booking_status = 'cancelled', updated_at = CURRENT_TIMESTAMP
            FROM payments p
            WHERE b.id = p.booking_id
              AND b.booking_status = 'booked'
              AND b.check_in_date < CURRENT_DATE
              AND p.payment_status != 'paid'
        """)

        cur.execute("""
            UPDATE payments p
            SET payment_status = 'failed'
            FROM bookings b
            WHERE p.booking_id = b.id
              AND b.booking_status = 'cancelled'
              AND p.payment_status = 'pending'
        """)

        cur.execute("""
            UPDATE bookings b
            SET booking_status = 'occupied', updated_at = CURRENT_TIMESTAMP
            FROM payments p
            WHERE b.id = p.booking_id
              AND b.booking_status = 'booked'
              AND b.check_in_date <= CURRENT_DATE
              AND b.check_out_date > CURRENT_DATE
              AND p.payment_status = 'paid'
        """)

        cur.execute("""
            UPDATE bookings
            SET booking_status = 'completed', updated_at = CURRENT_TIMESTAMP
            WHERE booking_status IN ('occupied', 'booked')
              AND check_out_date <= CURRENT_DATE
        """)

        conn.commit()
        cur.close()
        conn.close()
        print("✅ Booking statuses updated.")
    except Exception as e:
        print(f"❌ Status update error: {e}")

update_booking_statuses()

scheduler = BackgroundScheduler()
scheduler.add_job(update_booking_statuses, 'cron', hour=0, minute=0)
scheduler.start()
atexit.register(lambda: scheduler.shutdown())

if __name__ == "__main__":
    app.run(debug=True)