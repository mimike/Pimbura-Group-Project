from flask_login import UserMixin #isauthenticated
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash   #legacy
from .db import db

class Comments(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key= True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    comment = db.Column(db.String(), nullable=False)

    #user = db.relationship("User", back_populates="comments")
    #post = db.relationship("Posts", back_populates="post_comments")
    comment_likes = db.relationship("CommentLikes", backref="comment", cascade="all, delete")


    def to_dict(self):   #{id: asdf, username: asdf}
        return {
            "id": self.id,
            "post_id": self.post_id,
            "user_id": self.user_id,
            "comment": self.comment,
            "user": self.user.get_user(),
            "comment_likes": [like.to_dict() for like in self.comment_likes]
            # "user": self.user.to_dict(),  #clarify- may delete this
        }
