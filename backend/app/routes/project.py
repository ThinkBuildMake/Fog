import requests
from flask import Blueprint, request, jsonify
from datetime import datetime
from datetime import timedelta
import hashlib
# Blueprints modularize code
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity, create_access_token, set_access_cookies
from mongoengine import ValidationError, NotUniqueError, OperationError

from app.customfuncs.customfunctions import get_essential_json
from app.database.models import Project
from app.database.models import Hardware

from datetime import timezone
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

'''

Json API 
{
    "title" : "My test project",
    "description" : "This is a description about my project",
    "user_id" : "bob@gmail.com"
}
'''
@project.route("/create", methods=['POST'])
@jwt_required()
def create_project():
    if request.is_json:
        # Get Json from Request
        req_json = request.get_json()

        # Handle Optional Fields
        if "hardware_set" not in req_json:
            req_json['hardware_set'] = {}  # Default Dictionary Value
        if "all_users" not in req_json:
            req_json['all_users'] = []  # Default List of users
            req_json['all_users'].append(req_json['user_id']) # add the creator of project
        new_project = Project(**get_essential_json(req_json, 'create_project'))
        new_project.save()
        return jsonify(message="Project Created Successfully", status=201, data=new_project), 201
    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code



'''
TEST API

{
    "user_id" : "bob@gmail.com"
}


'''
@project.route("/<string:id>/add_user", methods=['POST'])
@jwt_required()
def add_user_to_project(id):
    try:
        project = Project.objects(id=id).first()
    except:
        return jsonify(message="Project ID not found", status=404), 404
    if request.is_json:
        # Get Json from Request
        req_json = request.get_json()
        if req_json['user_id'] not in project['all_users']:
            project['all_users'].append(req_json['user_id']) # add specified user to set of users
        else:
            return jsonify(message="User already added to project", status=400, data=project), 400
        project.save()
        return jsonify(message="Project Updated Successfully", status=200, data=project), 200
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



'''
Json API 
{
    "hardware_id" : "23525",
    "qty" : 100

}
'''


@project.route("/<string:id>/checkout", methods=['POST'])
@jwt_required()
def checkout_resource(id):
    if request.is_json:
        # Get Json from Request
        req_json = request.get_json()
        try:
            project = Project.objects(id=id).first()
        except:
            return jsonify(message="Project ID not found", status=404), 404
        try:
            globalHardware = Hardware.objects(id=req_json['hardware_id']).first()
        except:
            return jsonify(message="Global Hardware ID not found", status=404), 404

        available_resources = globalHardware['available_resources']
        if(req_json['qty'] > available_resources):
            return jsonify(message="Not enough Global HW resources"), 400


        hardware_set = project['hardware_set']

        dt = datetime.now(timezone.utc)
        utc_time = dt.replace(tzinfo=timezone.utc)
        time = utc_time.timestamp()

        # time, qty
        if req_json['hardware_id'] in hardware_set: # HW resource currently in project
            hardware_set[req_json['hardware_id']]['time'].append([time, req_json['qty']])
            hardware_set[req_json['hardware_id']]['qty'] += req_json['qty']
        else: # add global HW resource to project
            # {hardwareid: {'qty': 5, 'time': [['1:09':5],['1:10':10]}, hardwareid2: {'qty': 5, 'time': [['1:09':5],['1:10':10]}}
            hardware_set[req_json['hardware_id']] = {'qty': req_json['qty'], 'time': [[time, req_json['qty']]]}
        project.save()

        # Make Request

        # Update global Hardware resources
        bearer = request.headers.get("Authorization")
        requests.post(url=f"https://fog-test-abuimpincq-uc.a.run.app/hardware/{req_json['hardware_id']}/checkout", json={"amount": req_json['qty']},
                      headers={'Authorization': bearer})

        return jsonify(message="Checked out Hardware Set Successfully", status=200), 200
    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code


'''
JSON API
{
    "hardware_id" : "23525",
    "qty" : 8
}
'''
# check in resource needs updating and then billing
@project.route("/<string:id>/checkin", methods=['POST'])
@jwt_required()
def checkin_resource(id):
    if request.is_json:
        # Get Json from Request
        req_json = request.get_json()
        try:
            project = Project.objects(id=id).first()
        except:
            return jsonify(message="Project ID not found", status=404), 404
        try:
            globalHardware = Hardware.objects(id=req_json['hardware_id']).first()
        except:
            return jsonify(message="Global Hardware ID not found", status=404), 404

        hardware_set = project['hardware_set']

        dt = datetime.now(timezone.utc)
        utc_time = dt.replace(tzinfo=timezone.utc)
        time = utc_time.timestamp()

        dummy_cost_rate = 5
        total_cost = 0

        if req_json['hardware_id'] in hardware_set:
            times = hardware_set[req_json['hardware_id']]['time']
            quantity = req_json['qty']
            if quantity > hardware_set[req_json['hardware_id']]['qty']:
                return jsonify(message="Cannot check in more than quantity checked out",
                               status=400), 400  # change this error code
            while quantity:
                if quantity > times[0][1]:
                    cur_time = times.pop(0)
                    quantity -= cur_time[1]
                    hardware_set[req_json['hardware_id']]['qty'] -= cur_time[1]
                    total_cost += dummy_cost_rate * (time - cur_time[0])
                else:
                    hardware_set[req_json['hardware_id']]['qty'] -= quantity
                    cur_time = times[0]
                    times[0][1] -= quantity
                    total_cost += dummy_cost_rate * (time - cur_time[0])
                    quantity = 0
        else:
            return jsonify(message="Hardware resource not found", status=404), 404  # change this error code
        project.save()

        # Update global Hardware resources
        bearer = request.headers.get("Authorization")
        requests.post(url=f"https://fog-test-abuimpincq-uc.a.run.app/hardware/{req_json['hardware_id']}/checkin", json={"amount": req_json['qty']},
                      headers={'Authorization': bearer})
        return jsonify(message="Checked in Hardware Set Successfully", cost=total_cost, status=200), 200
    else:
        return jsonify(message="Request needs to be JSON format", status=400), 400  # change this error code


@project.route("/", methods=['GET'])
@jwt_required()
def get_projects():
    return jsonify(status=200, message="Success", data=Project.objects),200

@project.route("/<string:user_email>", methods=['GET'])
@jwt_required()
def get_projects_user(user_email):
    userProjectList = []
    for cur_project in Project.objects:
        for email in cur_project.all_users:
            if user_email == email:
                userProjectList.append(cur_project)
    return jsonify(status=200, message="Success", data=userProjectList),200

@project.route("/<string:id>", methods=['GET'])
@jwt_required()
def get_project(id):
    project = Project.objects(id=id).first()
    if project:
        return jsonify(message="Success", status=200, data=project), 200
    else:
        return jsonify(message="Project not found", status=404),404