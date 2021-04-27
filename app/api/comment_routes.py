from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import db, Posts, Comments, Followers, CommentLikes, User


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



#Route for unliking a comment on a post:
@comment_routes.route('/<int:id>/likes/<int:likeId>', methods=['DELETE'])
@login_required
def comment_unlike(likeId):
    like = CommentLikes.query.get(likeId)
    db.session.delete(like)
    db.session.commit()
    return

