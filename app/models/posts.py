from flask_login import UserMixin #isauthenticated
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash   #legacy
from .db import db

class Posts(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    photo_url = db.Column(db.String(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False) #foreign key
    caption = db.Column(db.Text, nullable=False)

    user = db.relationship("User", back_populates="posts")  # an instance of the user class
    post_comments = db.relationship("Comments", back_populates="post")
    post_likes = db.relationship("PostLikes", back_populates="post")

    def to_dict(self):   #{id: asdf, username: asdf} in order to sent it to json, list, dict, or string
        return {
        "id": self.id,
        "photo_url": self.photo_url,
        # "user": self.user.to_dict(),   # call the to dict on the user model
        "caption": self.caption,
        # "post_comments": self.post_comments.to_dict(),
        # "post_likes": self.post_likes.to_dict()
        }
