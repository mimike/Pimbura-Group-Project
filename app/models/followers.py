# from werkzeug.security import generate_password_hash, check_password_hash  # legacy
# from flask_login import UserMixin  # isauthenticated
# from .db import db
# from flask_sqlalchemy import SQLAlchemy
# # DELETE FILE


# class Following(db.Model):
#     __tablename__ = "following"
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     # following_id is who the user_id is following
#     following_id = db.Column(
#         db.Integer, db.ForeignKey("users.id"), nullable=False)

#     # follower = db.relationship("User", back_populates='follower_id')
#     # following = db.relationship("User", back_populates='following_ids')

#     def to_dict(self):  # {id: asdf, username: asdf}
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "following_id": self.following_id
#         }
