import hashlib
import requests
from datetime import datetime
from datetime import timedelta
from datetime import timezone
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt, set_access_cookies
import jwt
import uuid
from mongoengine import ValidationError, NotUniqueError, OperationError

from ..database.models import Hardware
from ..settings import PASSWORD_SALT, JWT_SECRET_KEY
from ..customfuncs.customfunctions import validator, get_essential_json


# Blueprints modularize code 
hardware = Blueprint('hardware', __name__)

# Define Exceptions 
@hardware.errorhandler(ValidationError)
def handle_validation_error(error):
    return jsonify(message=str(error), status=400 ), 400

@hardware.errorhandler(NotUniqueError)
def handle_not_unique_error(error):
    return jsonify(message=str(error),status=400), 400

@hardware.errorhandler(OperationError)
def handle_operation_error(error):
    return jsonify(message=str(error), status=400 ), 400

# Using an `after_request` callback, we refresh any token that is within 30
# minutes of expiring. Change the timedeltas to match the needs of your application.
@hardware.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response



@hardware.route("/", methods=['POST'])
@jwt_required()
def create_resource():
    if request.is_json:
        # Get Json from Request
        req_json = request.get_json()

        # Handle Optional Fields
        if "capacity" not in req_json:
            req_json['capacity'] =  50 # Default Capacity Value
        if "price" not in req_json:
            req_json['price'] = 10 # Default Price Value

        req_json['available_resources'] = req_json['capacity'] 
        hardware = Hardware(**get_essential_json(req_json, 'create_resource'))
        hardware.save()

        return jsonify(message="Hardware Resource Created Successfully", status=201, data=hardware), 201
    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code


@hardware.route("/<string:id>", methods=['GET'])
@jwt_required()
def get_resource(id):
    resource = Hardware.objects(id=id).first()
    if resource:
        return jsonify(message="Success", status=200, data=resource), 200
    else:
        return jsonify(message="Hardware Resource not found", status=404),404

@hardware.route("/", methods=['GET'])
@jwt_required()
def get_resources():
    return jsonify(status=200, message="Success", data=Hardware.objects),200

@hardware.route("/<string:id>", methods=['DELETE'])
@jwt_required()
def delete_resource(id):
    resource = Hardware.objects(id=id).first()
    if resource:
        resource.delete()
        return jsonify(message="Deletion Successful", status=200), 200
    else:
        return jsonify(message="Hardware Resource not found", status=404), 404


@hardware.route("/<string:id>", methods=['PUT'])
@jwt_required()
def mutate_resource(id):
    if request.is_json:
         # Get Json from Request
        req_json = request.get_json()
      
        resource = Hardware.objects(id=id).first()
        if resource:
            resource.update(**req_json)
            resource.reload()

            return jsonify(message="Hardware Resource Updated Successfully", status=200, data=resource), 200
        else:
            return jsonify(message="Hardware Resource not found", status=404), 404

    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code

@hardware.route("/resources/<string:proj_id>", methods=['GET'])
@jwt_required()
def get_resources_by_proj_id(proj_id):
    # TODO: complete method once Projects are done
    return jsonify(message="NOT IMPLEMENTED YET", status=404), 404

@hardware.route("/<string:proj_id>", methods=['POST'])
@jwt_required()
def execute_updates(proj_id):
    if request.is_json:
         # Get Json from Request
        req_json = request.get_json()   
        bearer = request.headers.get("Authorization")
        queries = req_json['queries']
        
        # TODO: add support for project id  

        # Check Validity of Requests
        for query in queries:
            hardware_id = query['id']
            query_type = query['type']
            query_amount = query['amount']
            # Validates amount 
            if (type(query_amount) != int) or query_amount <= 0:
                return jsonify(message=f"Amount Value: {query_amount} is not valid", status=400), 400  # change this error code

            # Validates query type in request
            if query_type != "checkin" and query_type != "checkout":
                return jsonify(message=f"Request contains invalid query type {query_type}", status=400), 400  # change this error code
            
            # Check if Hardware Resource Exists
            resource = Hardware.objects(id=hardware_id).first()
            if not resource: 
                return jsonify(message=f"Request contains a hardware resource that was not found", status=400), 400  # change this error code

        # Execute Updates after verifying validity of request
        for query in queries:
            hardware_id = query['id']
            query_type = query['type']
            query_amount = query['amount']

            # Make Request
            requests.post(url=f"http://localhost:5000/hardware/{hardware_id}/{query_type}", json={"amount": query_amount}, headers={'Authorization': bearer})

        return jsonify(message="All Queries Executed", status=200), 200
    else: 
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code

@hardware.route("/<string:id>/checkout", methods=['POST'])
@jwt_required()
def checkout_resource(id):
    if request.is_json:
         # Get Json from Request
        req_json = request.get_json()   
        amount = req_json['amount']

        # Validates amount 
        if (type(amount) != int) or amount <= 0:
            return jsonify(message=f"Amount Value: {amount} is not valid", status=400), 400  # change this error code

        # TODO: add support for project id 
        resource = Hardware.objects(id=id).first()
        if resource:
            available_resources = resource['available_resources'] 
            if available_resources >= amount:
                resource.update(available_resources=available_resources-amount)
                resource.reload()
                return jsonify(message="Successful Checkout", status=200, data= resource)        
            else:
                return jsonify(message="Not Enough Resources to Fulfill Request", status=409), 409
        else:
            return jsonify(message="Hardware Resource not found", status=404), 404
    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code

@hardware.route("/<string:id>/checkin", methods=['POST'])
@jwt_required()
def checkin_resource(id):
    if request.is_json:
         # Get Json from Request
        req_json = request.get_json()   
        amount = req_json['amount']

        # Validates amount 
        if (type(amount) != int) or amount <= 0:
            return jsonify(message=f"Amount Value: {amount} is not valid", status=400), 400  # change this error code

        # TODO: add support for project id 
        resource = Hardware.objects(id=id).first()
        if resource:
            available_resources = resource['available_resources'] 
            capacity = resource['capacity']
            if available_resources + amount <= capacity:
                resource.update(available_resources=available_resources+amount)
                resource.reload()
                return jsonify(message="Successful Checkin Operation", status=200, data= resource)        
            else:
                return jsonify(message="Invalid Checkin Amount, Capacity Exceeded", status=409), 409
        else:
            return jsonify(message="Hardware Resource not found", status=404), 404
    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code

