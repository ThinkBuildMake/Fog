import os
from dotenv import load_dotenv

# Loads in environment variables 
load_dotenv()

# Settings Variables
MONGO_URI = os.environ['DB_CONNECTION']
DB_NAME = os.environ['DATABASE_NAME']