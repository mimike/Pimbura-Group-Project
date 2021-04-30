from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, Posts, Comments, CommentLikes, User


comment_routes = Blueprint('comments', __name__)


# Route for liking a comment
@comment_routes.route('/<int:id>/like', methods=['POST'])
@login_required
def comment_like(id):
    print('INSIDE BACKEND ROUTE FOR LIKING A POST===========================')
    like = CommentLikes(
        user_id=current_user.id,
        comment_id=id
    )
    db.session.add(like)
    db.session.commit()
    return {"like": like.to_dict()}



#Route for unliking a comment on a post:
@comment_routes.route('/<int:id>/unlike', methods=['DELETE'])
@login_required
def comment_unlike(id):
    like = CommentLikes.query.get(id)
    db.session.delete(like)
    db.session.commit()
    return {"unliked": "test"}
