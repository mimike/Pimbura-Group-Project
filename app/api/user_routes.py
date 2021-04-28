from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from app.forms.search_form import SearchForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# GET Route for searching:
@user_routes.route('/<int:id>/search')
@login_required
def search_user(id):
    form = SearchForm()
    searched_user = form.search.data
    user = User.query.filter(User.username.ilike('%searched_user%')).all()
    # print("user", user)
    return "Searching"


# POST Route for searching:
@user_routes.route('/<int:id>/search', methods=['POST'])
@login_required
def post_search_user(id):
    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = User()
        form.populate_obj(data)
    return


