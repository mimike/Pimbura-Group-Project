from flask import Blueprint, jsonify, redirect
from flask_login import login_required, current_user
from app.models import db, Posts
from app.forms.post_form import PostForm

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
    if form.validate_on_submit():
        post = Posts(	
            photo_url=form.photo_url.data,  # don't forget AWS
            user_id=current_user.id,
            caption=form.caption.data
            )

        db.session.add(post)
        db.session.commit()
    return redirect('/')
   

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
