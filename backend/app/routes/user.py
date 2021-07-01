import hashlib

from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
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
            access_token = create_access_token(identity={"first_name": user['first_name'], "last_name": user['last_name'], "email": user['email']})
            return jsonify(message="User created successfully.",status=201, access_token=access_token), 201

    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code


@user.route('/login', methods=['POST'])
def login():
    if request.is_json:
        # Get Json from Request
        req_json = request.get_json()

        # Validate Request (ie. email is valid, contains all fields necessary, etc)
        validate = login_validator(req_json)

        if not validate['valid']:
            return jsonify(validate), validate['status']
        else:
            
            # Get required fields
            email = req_json["email"]
            password = req_json["password"]

            # Check if password is correct
            password_encrypted = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 1000)
            test = User.objects(email=email, password=password_encrypted).first()



            if test:
                # Get additional Identifier Fields ie. firstname and lastname
                first_name = test.first_name
                last_name = test.last_name

                access_token = create_access_token(identity={"first_name": first_name, "last_name": last_name, "email": email})
                return jsonify(message="Login Succeeded!",status=200, access_token=access_token)
            else:
                return jsonify(message="Bad email or password", status=401), 401
    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code


# https://stackoverflow.com/questions/55933037/how-to-send-bearer-token-to-client-and-then-call-token-from-client


# Protected Route that Returns the Authorized User Information
@user.route("/auth", methods=['GET'])
@jwt_required()
def getAuthorizedInformation(): 
    # https://flask-jwt-extended.readthedocs.io/en/stable/basic_usage/
    user = get_jwt_identity()
    return jsonify(message="user authorized", status=200, user=user), 200
