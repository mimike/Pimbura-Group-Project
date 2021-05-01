from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User
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


# GET Route for searching: NO GET ROUTE FOR THE SEARCH
# @user_routes.route('/search')
# @login_required
# def search_user():
#     print("-------user--------")
#     form = SearchForm()
#     searched_user = form.search.data
#     print("++++++++++++++++++", searched_user)
#     users = User.query.filter(User.username.like('%searched_user%')).all()
#     return {"users": [user.to_dict() for user in users]}


# POST Route for searching:
@user_routes.route('/search', methods=['POST'])
@login_required
def post_search_user():
    data = request.json["search"]
    # print("4------------------", data)
    # if not data:
    #     return {"users": []}
    users = User.query.filter(User.username.ilike(f'%{data}%')).all()
    # print("5++++++++++", {"users": [user.to_dict() for user in users]})
    return {"users": [user.to_dict() for user in users]}
