from flask_login import UserMixin #isauthenticated
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash   #legacy
from .db import db

class CommentLikes(db.Model):
    __tablename__ = "comment_likes"

    id = db.Column(db.Integer, primary_key= True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)

    #comment = db.relationship("Comments", back_populates="comment_likes")
    #user = db.relationship("User", back_populates="comment_likes")
    # a user can like many comments. user refers to a single user and comment_likes refers to a user's like on an individual comment


    def to_dict(self):
        return {
        "id": self.id,
        "user_id": self.user_id,
        "comment_id": self.comment_id,


        }
