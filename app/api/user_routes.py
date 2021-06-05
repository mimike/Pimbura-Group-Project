from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, follows, db
import json

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    print('------------------', users)
    return {"users": [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# POST Route for searching:
@user_routes.route('/search', methods=['POST'])
@login_required
def post_search_user():
    data = request.json["search"]
    users = User.query.filter(User.username.ilike(f'%{data}%')).all()
    return {"users": [user.to_dict() for user in users]}


# route for posting a follow
@user_routes.route('/<int:id>/follow', methods=['POST'])
@login_required
def post_follow(id):
    user = User.query.get(id)
    db.session.execute(f'''INSERT INTO followers (follower_id, followed_id)
    VALUES ({id}, {current_user.id});''')
    db.session.commit()
    return user.to_dict()

@user_routes.route('/suggested')
@login_required
def get_suggested():
    suggested = User.query.filter(~User.followers.any(User.id == current_user.id)).all()
    return {"users": [user.to_dict() for user in suggested]}
