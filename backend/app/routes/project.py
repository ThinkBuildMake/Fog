from flask import Blueprint

# Blueprints modularize code
project = Blueprint('project', __name__)


@project.route("/")
def home():
    return "It works! :D"
