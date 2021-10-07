# A file of helper functions
from flask.json import jsonify
from ..database.models import User

# Find a more efficient way of doing this
signup_fields = ['email', 'first_name', 'last_name', 'password']
login_fields = ['email', 'password']

# object 
json_extract_fields = {
    "signup_fields": ['email', 'first_name', 'last_name', 'password'],
    "login_fields": ['email', 'password'],
    "create_resource": ['title', 'capacity', 'available_resources', 'price'],
    "create_project": ['title', 'description', 'hardware_set', 'user_id']
}


# Takes in an dict object returns a truncated verson of that object
def get_essential_json(data, name):
    ret_json = {}
    for item in json_extract_fields[name]:
        ret_json[item] = data[item]
    return ret_json


def validator(data, method_name):
    missing_fields = []
    if method_name not in json_extract_fields:
        return {"valid": False, "message": f"{method_name} not found!"}

    for field in json_extract_fields[method_name]:
        if field not in data:
            missing_fields.append(field)
    if len(missing_fields) > 0:
        return {"valid": False, "message": f"Missing fields in request {missing_fields}", "status": 400}

    # does request contain any extra field (s)
    if len(data.keys()) > len(signup_fields):
        extra_fields = []
        for field in data:
            if field not in signup_fields:
                extra_fields.append(field)
        return {"valid": False, "message": f"Unrecognized fields in request {extra_fields}", "status": 400}

    return {"valid": True, "message": "ok"}


'''
Determines if the Json Request is valid
returns a dict object
{
    "valid": bool
    "message": string
}
'''


def signup_validator(data):
    # does request contain all fields necessary
    missing_fields = []

    for field in json_extract_fields['signup_fields']:
        if field not in data:
            missing_fields.append(field)
    if len(missing_fields) > 0:
        return {"valid": False, "message": f"Missing fields in request {missing_fields}", "status": 400}

    # does request contain any extra field (s)
    if len(data.keys()) > len(signup_fields):
        extra_fields = []
        for field in data:
            if field not in signup_fields:
                extra_fields.append(field)
        return {"valid": False, "message": f"Unrecognized fields in request {extra_fields}", "status": 400}

    # Does user exist
    user_exists = User.objects(email=data['email']).count() > 0
    if user_exists:
        return {"valid": False, "message": f"User with {data['email']} already exists", "status": 409}

    # TODO: valid email

    # TODO: valid password

    return {"valid": True, "message": "ok"}


''' 
TODO: Describe the function
'''


def login_validator(data):
    # does request contain all fields necessary
    missing_fields = []

    for field in json_extract_fields['login_fields']:
        if field not in data:
            missing_fields.append(field)
    if len(missing_fields) > 0:
        return {"valid": False, "message": f"Missing fields in request {missing_fields}", 'status': 400}

    # does request contain any extra field (s)
    if len(data.keys()) > len(login_fields):
        extra_fields = []
        for field in data:
            if field not in login_fields:
                extra_fields.append(field)
        return {"valid": False, "message": f"Unrecognized fields in request {extra_fields}", 'status': 400}

    # Does the user exist in the database
    user_exists = User.objects(email=data['email']).count() > 0
    if not user_exists:
        return {"valid": False, "message": f"User with email {data['email']} does not exist", 'status': 400}

    return {"valid": True, 'message': "ok"}
