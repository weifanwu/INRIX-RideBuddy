from app.models import *
from ._dev_data import *


def insert_user():
    for item in USERS:
        user = User(id=item["id"], name=item["name"], email=item["email"],
                    password_hash=generate_password_hash(item["password"]),
                    gender=item["gender"], age=item["age"], city=item["city"])
        db.session.add(user)
    db.session.commit()


def insert_message():
    for item in MESSAGES:
        message = Message(id=item["id"], text=item["text"], send_time=item["send_time"], sender_id=item["sender_id"],
                          receiver_id=item["receiver_id"])
        db.session.add(message)
    db.session.commit()


def insert_rider():
    for item in RIDERS:
        rider = Rider(id=item["id"], start_lon=item["start_lon"], start_lat=item["start_lat"], end_lon=item["end_lon"],
                      end_lat=item["end_lat"], content=item["content"], time=item["time"], user_id=item["user_id"])
        db.session.add(rider)
    db.session.commit()


def reset():
    db.drop_all()
    db.create_all()


def insert_all():
    insert_user()
    insert_message()
    insert_rider()
