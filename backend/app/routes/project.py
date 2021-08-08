from flask import Blueprint, request, jsonify

# Blueprints modularize code
from flask_jwt_extended import jwt_required

from app.customfuncs.customfunctions import get_essential_json
from app.database.models import Project

project = Blueprint('project', __name__)


@project.route("/")
def home():
    return "It works! :D"


@project.route("/create", methods=['POST'])
@jwt_required()
def create_project():
    if request.is_json:
        # Get Json from Request
        req_json = request.get_json()

        # Handle Optional Fields
        if "hardware_set" not in req_json:
            req_json['hardware_set'] = {}  # Default Dictionary Value
        project = Project(**get_essential_json(req_json, 'create_project'))
        project.save()

        return jsonify(message="Project Created Successfully", status=201, data=project), 201
    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code
