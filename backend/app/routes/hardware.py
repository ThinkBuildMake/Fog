import hashlib

from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import jwt
import uuid
from mongoengine import ValidationError, NotUniqueError, OperationError

from ..database.models import Hardware
from ..settings import PASSWORD_SALT, JWT_SECRET_KEY
from ..customfuncs.customfunctions import validator, get_essential_json


# Blueprints modularize code 
hardware = Blueprint('hardware', __name__)

@hardware.route("/", methods=['POST'])
@jwt_required()
def create_resource():
    if request.is_json:
        # Get Json from Request
        req_json = request.get_json()

        try:
            # Handle Optional Fields
            if "capacity" not in req_json:
                req_json['capacity'] =  50 # Default Capacity Value
            if "price" not in req_json:
                req_json['price'] = 10 # Default Price Value

            req_json['available_resources'] = req_json['capacity'] 
            hardware = Hardware(**get_essential_json(req_json, 'create_resource'))
            hardware.save()

            return jsonify(message="Hardware Resource Created Successfully", status=201, data=hardware), 201
        except ValidationError as e:
            return jsonify(message="Validation Error", status=400), 400
        except NotUniqueError as e:
            return jsonify(message=str(e),status=400), 400
    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code


@hardware.route("/<id>", methods=['GET'])
@jwt_required()
def get_resource(id):
    try:
        resource = Hardware.objects(id=id).first()
        if resource:
            return jsonify(message="Success", status=200, data=resource), 200
        else:
            return jsonify(message="Hardware Resource not found", status=404),404
    except ValidationError as e:
        return jsonify(message=str(e), status=400 ), 400

@hardware.route("/", methods=['GET'])
@jwt_required()
def get_resources():
    return jsonify(status=200, message="Success", data=Hardware.objects),200

@hardware.route("/<id>", methods=['DELETE'])
@jwt_required()
def delete_resource(id):
    try:
        resource = Hardware.objects(id=id).first()
        if resource:
            resource.delete()
            return jsonify(message="Deletion Successful", status=200), 200
        else:
            return jsonify(message="Hardware Resource not found", status=404), 404
    except ValidationError as e:
        return jsonify(message=str(e), status=400), 400

@hardware.route("/<id>", methods=['PUT'])
@jwt_required()
def mutate_resource(id):
    if request.is_json:
         # Get Json from Request
        req_json = request.get_json()
      
        try:
            resource = Hardware.objects(id=id).first()
            if resource:
                resource.update(**req_json)
                resource.reload()

                return jsonify(message="Hardware Resource Updated Successfully", status=200, data=resource), 200
            else:
                return jsonify(message="Hardware Resource not found", status=404), 404
        except (ValidationError, OperationError) as e:
            return jsonify(message=str(e), status=400), 400
    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code

