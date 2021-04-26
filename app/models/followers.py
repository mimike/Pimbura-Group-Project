from flask_login import UserMixin #isauthenticated
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash   #legacy
from .db import db

class Followers(db.Model):
    __tablename__ = "followers"
    id = db.Column(db.Integer, primary_key= True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    following_id = db.Column(db.Integer, db.ForeignKey("users.id")) #following_id is who the user_id is following

    # follower = db.relationship("User", back_populates='follower_id')
    # following = db.relationship("User", back_populates='following_ids')
    # db.relationship()

    # def to_dict(self):   #{id: asdf, username: asdf}
    #     return {
    #     "id": self.id,
    #     "user_id": self.user_id,
    #     "following_id": self.following_id
    #     }
