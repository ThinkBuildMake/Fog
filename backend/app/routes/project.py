from flask import Blueprint, request, jsonify

# Blueprints modularize code
from flask_jwt_extended import jwt_required
from mongoengine import ValidationError, NotUniqueError, OperationError

from app.customfuncs.customfunctions import get_essential_json
from app.database.models import Project

project = Blueprint('project', __name__)


# Define Exceptions
@project.errorhandler(ValidationError)
def handle_validation_error(error):
    return jsonify(message=str(error), status=400), 400


@project.errorhandler(NotUniqueError)
def handle_not_unique_error(error):
    return jsonify(message=str(error), status=400), 400


@project.errorhandler(OperationError)
def handle_operation_error(error):
    return jsonify(message=str(error), status=400), 400


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


# todo, add security for user deletion (users can delete other users projects)
@project.route("/<string:id>", methods=['DELETE'])
@jwt_required()
def delete_project(id):
    try:
        project = Project.objects(id=id).first()
    except:
        return jsonify(message="Project ID not found", status=404), 404
    project.delete()
    return jsonify(message="Deletion Successful", status=200), 200

@project.route("/<string:id>/checkout", methods=['POST'])
@jwt_required()
def checkout_resource(id):
    if request.is_json:
        # Get Json from Request
        req_json = request.get_json()
        project = Project.objects(id=id).first()
        hardware_set = project['hardware_set']
        if req_json['hardware_id'] in hardware_set:
            hardware_set[req_json['hardware_id']] += req_json['qty']
        else:
            hardware_set[req_json['hardware_id']] = req_json['qty']
        project.save()

        return jsonify(message="Checked out Hardware Set Successfully", status=200), 200
    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code

@project.route("/<string:id>/checkin", methods=['POST'])
@jwt_required()
def checkin_resource(id):
    if request.is_json:
        # Get Json from Request
        req_json = request.get_json()
        project = Project.objects(id=id).first()
        hardware_set = project['hardware_set']
        if req_json['hardware_id'] in hardware_set:
            if hardware_set[req_json['hardware_id']] < req_json['qty']:
                return jsonify(message="Not enough hardware resources to perform action", status=400), 400  # change this error code
            else:
                hardware_set[req_json['hardware_id']] -= req_json['qty']
        else:
            return jsonify(message="Hardware resource not found", status=404), 404  # change this error code
        project.save()
        return jsonify(message="Checked in Hardware Set Successfully", status=200), 200
    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code
