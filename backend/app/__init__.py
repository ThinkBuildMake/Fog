from flask import Flask


from app.extensions import mongo, db, jwt
from app.routes.posts import posts
from app.routes.user import user


def create_app(config_file='settings.py', test_config=None):
    app = Flask(__name__)
    app.config.from_pyfile(config_file)

    # Register MongoDB
    mongo.init_app(app)
    db.init_app(app)
    jwt.init_app(app)

    # Register Routes, pass in "url_prefix=" for route prefixes
    app.register_blueprint(user, url_prefix="/user")
    app.register_blueprint(posts, url_prefix="/")
    return app

# No need to call create_app() manually, Flask should do this automatically when you set path of app to 'app'
