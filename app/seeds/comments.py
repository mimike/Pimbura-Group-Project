from app.models import db, Comments
from faker import Faker
fake = Faker()
import random

def seed_comments():
    comment_list = [
        'Love',
        'wow!!!',
        'I miss you!',
        'Wonderful pic',
        'I like this',
        'Fun!'
    ]
    for num in range(100):
        comment = Comments(post_id=random.randrange(1,51), user_id=random.randrange(1,51), comment=comment_list[random.randrange(0,4)])
        db.session.add(comment)

    db.session.commit()
    



def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()

