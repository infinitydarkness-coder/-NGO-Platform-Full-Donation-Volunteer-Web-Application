from flask import Flask, render_template, request, jsonify, session, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os

app = Flask(__name__)
app.static_folder = '..'
app.static_url_path = ''
app.config['SECRET_KEY'] = os.urandom(24)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ngo.db'
db = SQLAlchemy(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Volunteer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    skills = db.Column(db.String(500))
    availability = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_id = db.Column(db.String(100), unique=True)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Routes
@app.route('/')
def home():
    return send_from_directory('..', 'home.html')

@app.route('/volunteer.html')
def volunteer_page():
    return send_from_directory('..', 'volunteer.html')

@app.route('/payment.html')
def payment_page():
    return send_from_directory('..', 'payment.html')

@app.route('/admin.html')
def admin_page():
    return send_from_directory('..', 'admin.html')

@app.route('/volunteer', methods=['GET', 'POST'])
def volunteer():
    if request.method == 'POST':
        data = request.json
        new_volunteer = Volunteer(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            skills=data['skills'],
            availability=data['availability']
        )
        db.session.add(new_volunteer)
        db.session.commit()
        
        # Print volunteer information to console
        print("\n=== New Volunteer Registration ===")
        print(f"Name: {data['name']}")
        print(f"Email: {data['email']}")
        print(f"Phone: {data['phone']}")
        print(f"Skills: {data['skills']}")
        print(f"Availability: {data['availability']}")
        print(f"Registration Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("================================\n")
        
        return jsonify({'message': 'Volunteer registration successful!'}), 201
    return render_template('volunteer.html')

@app.route('/payment', methods=['GET', 'POST'])
def payment():
    if request.method == 'POST':
        data = request.json
        new_donation = Donation(
            email=data['email'],
            amount=data['amount'],
            payment_id=data['payment_id']
        )
        db.session.add(new_donation)
        db.session.commit()
        
        # Print donation information to console
        print("\n=== New Donation Received ===")
        print(f"Email: {data['email']}")
        print(f"Amount: ${data['amount']:.2f}")
        print(f"Payment ID: {data['payment_id']}")
        print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("===========================\n")
        
        return jsonify({'message': 'Donation successful!'}), 201
    return render_template('payment.html')

@app.route('/api/payment/verify', methods=['POST'])
def verify_payment():
    data = request.json
    donation = Donation.query.filter_by(payment_id=data['payment_id']).first()
    if donation:
        donation.status = 'completed'
        db.session.commit()
        return jsonify({'message': 'Payment verified successfully!'}), 200
    return jsonify({'message': 'Payment not found'}), 404

@app.route('/admin')
def admin():
    return app.send_static_file('admin.html')

@app.route('/api/volunteers')
def get_volunteers():
    volunteers = Volunteer.query.order_by(Volunteer.created_at.desc()).all()
    return jsonify([{
        'name': v.name,
        'email': v.email,
        'phone': v.phone,
        'skills': v.skills,
        'availability': v.availability,
        'created_at': v.created_at.isoformat()
    } for v in volunteers])

@app.route('/api/donations')
def get_donations():
    donations = Donation.query.order_by(Donation.created_at.desc()).all()
    return jsonify([{
        'email': d.email,
        'amount': d.amount,
        'payment_id': d.payment_id,
        'status': d.status,
        'created_at': d.created_at.isoformat()
    } for d in donations])

def init_db():
    with app.app_context():
        # Create database tables
        db.create_all()
        print("Database initialized successfully!")

if __name__ == '__main__':
    init_db()  # Initialize database tables
    print("Starting server...")
    print("Access the following URLs:")
    print("- Home: http://127.0.0.1:5000/")
    print("- Volunteer: http://127.0.0.1:5000/volunteer.html")
    print("- Payment: http://127.0.0.1:5000/payment.html")
    print("- Admin: http://127.0.0.1:5000/admin.html")
    app.run(debug=True, host='127.0.0.1', port=5000)