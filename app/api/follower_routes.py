from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, Posts, Comments, PostLikes, User
from app.forms.post_form import PostForm
from app.forms.comment_form import CommentForm
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)
import json

follower_routes = Blueprint('follower', __name__)

@follower_routes.route('/<int:user_id>')
def get_followers(user_id):
    user = User.query.get(user_id)
    followers = user.followers
    for follower in followers:
        print("FFFF", follower)
    return {"user": user.to_dict()}
