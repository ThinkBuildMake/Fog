import os
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
PASSWORD_SALT= os.environ['PASSWORD_SALT']
JWT_SECRET_KEY= os.environ['JWT_SECRET_KEY']