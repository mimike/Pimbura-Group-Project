# from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                hashed_password='password', avatar_url='https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg')
    db.session.add(demo)

    for num in range(50):
        user = User(username=fake.name(), email=fake.email(), hashed_password='password', avatar_url='https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg')
        db.session.add(user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()



# fake.name()
# fake.username()
# fake.email()
# fake.avatarUlr()

