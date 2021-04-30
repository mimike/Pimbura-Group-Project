from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
#joins table
follows = db.Table(
    "followers", db.Model.metadata,
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar_url = db.Column(db.String())


    # referencing the variable user in posts.py
    posts = db.relationship("Posts", backref="user", cascade="all, delete")
    comments = db.relationship("Comments", backref="user")
    comment_likes = db.relationship("CommentLikes", backref="user", cascade="all, delete")
    post_likes = db.relationship("PostLikes", backref="user", cascade="all, delete")
    # follower = db.relationship("Followers", backref='user', cascade="all, delete")
    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("follows", lazy="dynamic"),
        lazy="dynamic"
    )
    # following_ids = db.relationship("Followers", back_populates='following', foreign_keys='followers.following_id')
    # Would like to try to make this work
    # follower_id = db.relationship("Followers", backref='follower', foreign_keys='followers.user_id')
    # following_ids = db.relationship("Followers", backref='following', foreign_keys='followers.following_id')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "avatar_url": self.avatar_url,
            # a list w/id, photourl, user, caption
            "posts": [post.to_dict() for post in self.posts],
            "followers": [follower.get_user() for follower in self.followers]
            # ^ recursion error if u do follower.to_dict()

            # "comments": self.comments.to_dict(),
            # "comment_likes": self.comment_likes.to_dict(),
            # "post_likes": self.post_likes.to_dict(),
            # "following_ids": self.following_id.to_dict()
        }

    def get_user(self):
        return {
            "username": self.username,
            "avatar_url": self.avatar_url,
        }
