from flask import Blueprint, jsonify, request
from extensions import mongo
user = Blueprint('user', __name__)


@user.route('/', methods=["GET"])
def user_index():
    user_db = mongo.db.users
    ob = []
    for user in user_db.find():
        # Processing object to make it json serializable
        user['_id'] = str(user['_id'])
        ob.append(user)

    return jsonify(
        status=200,
        message='Successful',
        data=ob
    )

@user.route('/<usr>', methods=["GET"])
def get_user_by_name(usr):
    user_db = mongo.db.users
    query = user_db.find({"name": usr})
    ret = []
    for item in query:
        item['_id'] = str(item['_id'])
        ret.append(item)
    return jsonify(
        status=200,
        message="Successful",
        data={
            "Item": ret
        }
    )
@user.route('/', methods=["POST"])
def add_user():
    user_db = mongo.db.users
    data = request.get_json()
    # Insert a record into the users collection
    x = user_db.insert_one(data)
    return jsonify(
        status=200,
        message='Successful',
        data={
            "id": str(x.inserted_id)
        }
    )


