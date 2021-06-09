import hashlib

from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required
import jwt

from ..database.models import User

user = Blueprint('user', __name__)

from ..settings import PASSWORD_SALT, JWT_TOKEN_KEY

salt = bytes(PASSWORD_SALT, 'utf-8')
token_key = JWT_TOKEN_KEY


@user.route("/")
def home():
    return "It works! :D"


@user.route('/register', methods=['POST'])
def register():
    if request.is_json:
        email = request.json["email"]
        test = User.objects(email=email).first()
        if test:
            return jsonify(message="That email already exists"), 409
        else:
            first_name = request.json["first_name"]
            last_name = request.json["last_name"]
            password = request.json["password"]
            # Create new user
            user = User(first_name=first_name, last_name=last_name, password=password, email=email)
            # Store the hashed password
            # https://nitratine.net/blog/post/how-to-hash-passwords-in-python/
            user['password'] = hashlib.pbkdf2_hmac('sha256', user['password'].encode('utf-8'), salt, 1000)
            user.save()
            return jsonify(message="User created successfully."), 201
    else:
        return jsonify(message="Needs to be JSON format"), 404  # change this error code


@user.route('/login', methods=['POST'])
def login():
    if request.is_json:
        # Get required fields
        email = request.json["email"]
        password = request.json["password"]
        # Check if password is correct
        password_encrypted = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 1000)
        test = User.objects(email=email, password=password_encrypted).first()
        if test:
            access_token = create_access_token(identity=email)
            return jsonify(message="Login Succeeded!", access_token=access_token)
        else:
            return jsonify(message="Bad email or password"), 401
    else:
        return jsonify(message="Needs to be JSON format"), 404  # change this error code


# https://stackoverflow.com/questions/55933037/how-to-send-bearer-token-to-client-and-then-call-token-from-client


# Exampmle of route that uses the token authorization mechanism
@user.route("/auth", methods=['POST'])
@jwt_required
def authorized():
    return jsonify(message="user authorized")
