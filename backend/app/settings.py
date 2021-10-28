import os
from datetime import timedelta

from dotenv import load_dotenv

# Loads in environment variables 
load_dotenv()

# Settings Variables
MONGO_URI = os.environ['DB_CONNECTION']
DB_NAME = os.environ['DATABASE_NAME']

# For MongoEngine
MONGODB_SETTINGS = {
    'db': os.environ['DATABASE_NAME'],
    'host': os.environ['DB_CONNECTION']
}

# Secret keys and salts
PASSWORD_SALT = os.environ['PASSWORD_SALT']
JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']

# Refreshing tokens w/ cookies https://flask-jwt-extended.readthedocs.io/en/stable/refreshing_tokens/
# If true this will only allow the cookies that contain your JWTs to be sent
# over https. In production, this should always be set to True
JWT_COOKIE_SECURE = False
JWT_COOKIE_CSRF_PROTECT = False
JWT_TOKEN_LOCATION = ["cookies"]
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
