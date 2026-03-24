from flask import Flask
from flask_cors import CORS
import os
from routes import customer_bp, owner_bp, superadmin_bp

app = Flask(__name__, static_folder='static')
CORS(app)

UPLOAD_FOLDER = 'static/uploads/rooms'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.register_blueprint(customer_bp)
app.register_blueprint(owner_bp)
app.register_blueprint(superadmin_bp)

if __name__ == "__main__":
    app.run(debug=True)