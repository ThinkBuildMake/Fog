from app.extensions import db

class User(db.Document):
    email = db.EmailField(required=True)
    password = db.BinaryField(required=True)
    first_name = db.StringField(required=True)
    last_name = db.StringField(required=True)
