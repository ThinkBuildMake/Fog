import hashlib

from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required
import jwt

from ..database.models import User
from ..settings import PASSWORD_SALT, JWT_SECRET_KEY
from ..customfuncs.customfunctions import login_validator, signup_validator, get_essential_json

# Blueprints modularize code 
user = Blueprint('user', __name__)
salt = bytes(PASSWORD_SALT, 'utf-8')
token_key = JWT_SECRET_KEY

@user.route("/")
def home():
    return "It works! :D"


@user.route('/register', methods=['POST'])
def register():
    if request.is_json:
        # Get JSON from Request
        req_json = request.get_json()

        # Validate Request (ie. email is valid, contains all fields necessary, etc)
        validate = signup_validator(req_json)

        # Dynamically return error codes
        if not validate['valid']:
            return jsonify(validate), validate['status']
        else:

            # Create new user dictionary/json
            user = User(**get_essential_json(req_json,'signup_fields'))

            # Store the hashed password => https://nitratine.net/blog/post/how-to-hash-passwords-in-python/
            user['password'] = hashlib.pbkdf2_hmac('sha256', user['password'].encode('utf-8'), salt, 1000)
            user.save()

            # Create Access Token
            access_token = create_access_token(identity=user['email'])
            return jsonify(message="User created successfully.",access_token=access_token), 201

    else:
        return jsonify(message="Request needs to be JSON format"), 400  # change this error code


@user.route('/login', methods=['POST'])
def login():
    if request.is_json:
        # Get Json from Request
        req_json = request.get_json()

        # Validate Request (ie. email is valid, contains all fields necessary, etc)
        validate = login_validator(req_json)

        if not validate['valid']:
            return jsonify(validate, validate['status'])
        else:
            
            # Get required fields
            email = req_json["email"]
            password = req_json["password"]

            # Check if password is correct
            password_encrypted = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 1000)
            test = User.objects(email=email, password=password_encrypted).first()
            
            if test:
                access_token = create_access_token(identity=email)
                return jsonify(message="Login Succeeded!", access_token=access_token)
            else:
                return jsonify(message="Bad email or password"), 401
    else:
        return jsonify(message="Request needs to be JSON format"), 400  # change this error code


# https://stackoverflow.com/questions/55933037/how-to-send-bearer-token-to-client-and-then-call-token-from-client


# Exampmle of route that uses the token authorization mechanism
@user.route("/auth", methods=['POST'])
@jwt_required()
def authorized():
    return jsonify(message="user authorized")
