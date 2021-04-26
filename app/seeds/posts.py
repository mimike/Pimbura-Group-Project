from app.models import db, Posts
from faker import Faker
fake = Faker()
# make sure to run pip install requests
import requests 
import json
import random

def seed_posts():
    url = 'https://api.unsplash.com/photos/random?orientation=squarish&count=30&client_id=w7D9hahfveF5lpAyA5ED7oMcmfmnf-34xpUmZsC2ubs'
    r = requests.get(url)
    response = r.json()
    newList = []
    for item in response:
        newList.append(item["urls"]["small"])
    
    caption_list = [
    "my lunch today",
    "my dinner today,",
    "my breakfast today,",
    "a sunset",
    "a sunrise",
    "a selfie of me and my dog"
    ]
    # i = 1
    # quantity = 30
    # while i <= quantity:
    # caption=captionList[random.randrange(0, len(captionList))]
    
    for num in range(50):
        post = Posts(photo_url=newList[random.randrange(0,29)], user_id=num+1, caption=caption_list[random.randrange(0,4)])
        db.session.add(post)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()

    
