from flask import Blueprint, jsonify

bp = Blueprint("posts", __name__)


@bp.route('/', methods=["GET"])
def getPosts():
    return jsonify(
        status=200,
        message="yes"
    )
