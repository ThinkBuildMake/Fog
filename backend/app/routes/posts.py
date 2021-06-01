from flask import Flask, Blueprint, jsonify
posts = Blueprint("posts", __name__)

@posts.route('/', methods=["GET"])
def getPosts():
    return jsonify(
        status=200,
        message="yes"
    )