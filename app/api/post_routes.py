from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Post

user_routes = Blueprint('posts', __name__)

