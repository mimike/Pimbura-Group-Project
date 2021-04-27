from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, Posts
from app.forms.post_form import PostForm
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)

# this route will create a new post, get posts(from my followers), delete a post, and patch a post.
# We need an explore route!!! Thinking!


@post_routes.route('/')
@login_required
def get_posts():
    posts = Posts.query.all()  # ??????
    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route('/', methods=['POST'])
@login_required
def post_post():
    form = PostForm()
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    form['url'].data = url

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Posts(
            photo_url=url,  # don't forget AWS 43
            user_id=current_user.id,
            caption=form.caption.data
            )

        db.session.add(post)
        db.session.commit()
    return redirect('/')

#route for posting a comment
@post_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def post_comment(id):
    return "hi"



@post_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def patch_post(id):
    form = PatchForm()
    post = Posts.query.get(id)
    post.caption = form.caption.data
    db.session.commit()
    return redirect('/')


@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Posts.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return redirect('/')
