import os
import jwt
import datetime
import hashlib
from functools import wraps
from flask import Blueprint, jsonify, request
from extensions import mongo
from database.models import User
from customfuncs.customfunctions import signup_validator, login_validator

user = Blueprint('user', __name__)

# is this bad practice
from settings import PASSWORD_SALT, JWT_TOKEN_KEY
salt = bytes(PASSWORD_SALT,'utf-8')
token_key = JWT_TOKEN_KEY


@user.route('/signup',methods=['POST'])
def sign_up():
    data = request.get_json()
    # Call validation function
    valid = signup_validator(data)

    # todo: create a custom func for returning errors
    if not valid['valid']:
        return jsonify(
            status=400,
            data={
                "msg": valid['msg']
            }
        ),400

    # Create new user
    new_user = User(**data)
    
    # Store the hashed password 
    # https://nitratine.net/blog/post/how-to-hash-passwords-in-python/
    new_user['password']= hashlib.pbkdf2_hmac('sha256', new_user['password'].encode('utf-8'), salt, 1000)
    new_user.save()

    # Issue the JWT Tokens with expiry of 1 day
    token = jwt.encode({'email': data['email'], 'exp': datetime.datetime.now() + datetime.timedelta(hours=24)},token_key)
    
    # Return 201 signifying that user has been created, return jwt
    return jsonify(
        status=201,
        data={
            "msg": valid['msg'],
            "token": token
        }
    ),201

@user.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Get required fields
    email = data['email']
    password = data['password']

    # Call validation function
    valid = login_validator(data)
    if not valid['valid']:
        return jsonify(
            status=400,
            data=valid
        ),400
    
    # Check if password is correct
    user = User.objects(email=data['email']).first()
    test_password = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 1000)
    if test_password != user['password']:
        return jsonify(
            status=200,
            data={
                "msg": "Your email or password was incorrect"
            }
        )
    
    # Issue the JWT Tokens
    token = jwt.encode({'email': data['email'], 'exp': datetime.datetime.now() + datetime.timedelta(hours=24)},token_key)

    return jsonify(
        status=200,
        data={
            "msg": "Valid Login",
            "token": token
        }
    ),200

def token_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'msg': "Token is missing"})
        try:
            data = jwt.decode(token, token_key, algorithms=["HS256"])
            user_from_token = User.objects(email=data['email']).first()
        except Exception as e:
            # TODO: Deal with Token Expiration 
            return jsonify(
                data={
                    'msg': e.args[0] # Token expiration or invalid token
                }
            ),400
        return f(user_from_token, *args, **kwargs)
    return decorated

# Exampmle of route that uses the token authorization mechanism
@user.route("/auth", methods=['GET'])
@token_auth
def authorized(user_from_token):
    return jsonify(
        data={
            'msg': "User is authorized"
        }
    )

