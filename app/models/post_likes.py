from flask_login import UserMixin #isauthenticated
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash   #legacy
from .db import db

class PostLikes(db.Model):
    __tablename__ = "post_likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)

    #post = db.relationship("Posts", back_populates="post_likes")
    #user = db.relationship("User", back_populates="post_likes")


    def to_dict(self):   #{id: asdf, username: asdf}
        return {
        "id": self.id,
        "user_id": self.user_id,
        "post_id": self.post_id
        }
