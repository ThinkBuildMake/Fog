from app.extensions import db


class User(db.Document):
    email = db.EmailField(required=True, unique=True)
    password = db.BinaryField(required=True)
    first_name = db.StringField(required=True, min_length=1)
    last_name = db.StringField(required=True, min_length=1)


class Hardware(db.Document):
    title = db.StringField(required=True, unique=True)
    capacity = db.IntField(required=True, min_value=0)
    available_resources = db.IntField(required=True, min_value=0)
    price = db.FloatField(required=True, min_value=0)


# Need update, copied from Hardware
class Project(db.Document):
    title = db.StringField(required=True, unique=True)
    description = db.StringField(required=True)
    hardware_set = db.DictField()
    user_id = db.StringField(required=True)



