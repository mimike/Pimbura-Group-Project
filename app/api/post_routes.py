from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, Posts, Comments, Followers, PostLikes, User
from app.forms.post_form import PostForm
from app.forms.comment_form import CommentForm
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)

# this route will create a new post, get posts(from my followers), delete a post, and patch a post.
# We need an explore route!!! Thinking!


# Route for getting all of the posts from the user followers
@post_routes.route('/')
@login_required
def get_posts():
    posts = Posts.query.all()  # ??????
    return {"posts": [post.to_dict() for post in posts]}


# Route for getting a single post:
@post_routes.route('/<int:id>')
@login_required
def get_single_post(id):
    post = Posts.query.get(id)
    return {"post": post.to_dict()}


# Route for posting a single post:
@post_routes.route('/', methods=['POST'])
@login_required
def post_post():
    # print('_________________', request.files)
    form = PostForm()
    if "image" not in request.files:
        # print('_________________LINE 27')
        return {"errors": "image required"}, 400

    image = request.files["image"]
    # print('_________________LINE 31')
    if not allowed_file(image.filename):
        # print('_________________LINE 33')
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    # print('this is the upload', upload)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        # print('_________________LINE 44')
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
    return "HI!!!"

# route for liking a post
@post_routes.route('/<int:id>/like', methods=['POST'])
@login_required
def post_like(id):
    like = PostLikes(
        user_id=current_user.id,
        post_id=id
    )
    db.session.add(like)
    db.session.commit()
    return like.to_dict()


#route for posting a comment
@post_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def post_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comments(
            post_id=id,
            user_id=current_user.id,
            comment=form.comment.data
        )
    db.session.add(comment)
    db.session.commit()
    return 


#Route for patching a post
@post_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def patch_post(id):
    form = PatchForm()
    post = Posts.query.get(id)
    post.caption = form.caption.data
    db.session.commit()
    return redirect('/')


#Route for patching a comment
@post_routes.route('/<int:id>/comments/<int:commentId>', methods=['PATCH'])
@login_required
def patch_comment(commentId):
    form = CommentForm()  # Maybe another form!!!
    edited_comment = Comments.query.get(commentId)
    edited_comment.comment = form.comment.data
    db.session.commit()
    return


# Route for deleting a post
@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Posts.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return redirect('/')

# Route for deleting a comment
@post_routes.route('/<int:id>/comments/<int:commentId>', methods=['DELETE'])
@login_required
def delete_comment(commentId):
    comment = Comments.query.get(commentId)
    db.session.delete(comment)
    db.session.commit()
    return


# Route for unliking a post
@post_routes.route('/like/<int:likeId>', methods=['DELETE'])
@login_required
def post_unlike(likeId):
    print('---------------------------', likeId)
    like = PostLikes.query.get(likeId)
    db.session.delete(like)
    db.session.commit()
    return {"like": None}
