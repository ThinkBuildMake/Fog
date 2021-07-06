from app.extensions import db

class User(db.Document):
    email = db.EmailField(required=True)
    password = db.BinaryField(required=True)
    first_name = db.StringField(required=True)
    last_name = db.StringField(required=True)

class Hardware(db.Document):
    title = db.StringField(required=True, unique=True)
    capacity = db.IntField(required=True)
    available_resources = db.IntField(required=True)
    price = db.FloatField(required=True)