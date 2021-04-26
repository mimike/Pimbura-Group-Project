from app.models import db, CommentLikes
import random

def seed_comment_likes():
    for num in range(50):
        comment_like = CommentLikes(user_id=random.randrange(1,51), comment_id=random.randrange(1,51))
        db.session.add(comment_like)

    db.session.commit()


def undo_comment_likes():
    db.session.execute('TRUNCATE comment_likes RESTART IDENTITY CASCADE;')
    db.session.commit()