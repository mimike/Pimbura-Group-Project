from app.models import db, PostLikes
import random

def seed_post_likes():
    for num in range(50):
        post_like = PostLikes(user_id=random.randrange(1,51), post_id=random.randrange(1,51))
        db.session.add(post_like)

    db.session.commit()


def undo_post_likes():
    db.session.execute('TRUNCATE post_likes RESTART IDENTITY CASCADE;')
    db.session.commit()