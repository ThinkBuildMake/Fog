from flask import Flask
from flask_cors import CORS

from app.extensions import mongo, db, jwt
from app.routes.posts import posts
from app.routes.user import user
from app.routes.hardware import hardware


def create_app(config_file='settings.py', test_config=None):
    app = Flask(__name__)
    app.config.from_pyfile(config_file)

    # Add CORS support to app
    CORS(app)

    # Register Services
    mongo.init_app(app)
    db.init_app(app)
    jwt.init_app(app)

    # Register Routes, pass in "url_prefix=" for route prefixes
    app.register_blueprint(user, url_prefix="/user")
    app.register_blueprint(posts, url_prefix="/")
    app.register_blueprint(hardware, url_prefix="/hardware")
    
    return app

# No need to call create_app() manually, Flask should do this automatically when you set path of app to 'app'
