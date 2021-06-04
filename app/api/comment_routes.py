from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, Posts, Comments, CommentLikes, User


comment_routes = Blueprint('comments', __name__)


# Route for liking a comment
@comment_routes.route('/<int:id>/like', methods=['POST'])
@login_required
def comment_like(id):
    like = CommentLikes(
        user_id=current_user.id,
        comment_id=id
    )
    db.session.add(like)
    db.session.commit()
    comment = Comments.query.get(id)
    post_id = comment.post_id
    post = Posts.query.get(post_id)
    return {"post": post.to_dict()}
    # return {"like": like.to_dict()}



#Route for unliking a comment on a post:
@comment_routes.route('/<int:id>/unlike/<int:comment_id>', methods=['DELETE'])
@login_required
def comment_unlike(id, comment_id):
    user_id=current_user.id
    like = CommentLikes.query.filter(CommentLikes.user_id == user_id, CommentLikes.comment_id == comment_id).one()
    db.session.delete(like)
    db.session.commit()
    comment = Comments.query.get(comment_id)
    post_id = comment.post_id
    post = Posts.query.get(post_id)
    return {"post": post.to_dict()} 
