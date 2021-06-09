from flask_pymongo import PyMongo
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager

# MongoDB Database 
mongo = PyMongo()

# MongoEngine allows us to create templates for our documents
db = MongoEngine()

# JWT library allows for easy authentication of endpoints
jwt = JWTManager()
