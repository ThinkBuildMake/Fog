import os
from flask import Flask, Blueprint
from extensions import mongo 
from routes.user import user
from routes.posts import posts

def create_app(config_file='settings.py'):
    app = Flask(__name__)
    app.config.from_pyfile(config_file)
    
    # Register MongoDB
    mongo.init_app(app)

    # Register Routes, pass in "url_prefix=" for route prefixes
    app.register_blueprint(user, url_prefix="/users")
    app.register_blueprint(posts, url_prefix="/posts")
    return app

# Feel free to turn off the debug flag during production
create_app().run(debug=True)
