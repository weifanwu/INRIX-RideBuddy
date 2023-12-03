from datetime import datetime

from . import db


class Initialization:
    @staticmethod
    def db_initialization():
        db.drop_all()
        db.create_all()


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    gender = db.Column(db.String(20))
    age = db.Column(db.Integer)
    city = db.Column(db.String(100))
    # Relationships
    # conversation_info = db.relationship('Conversation', backref='users', lazy=True)
    sender_info = db.relationship('Message', backref='sender', foreign_keys="Message.sender_id", lazy=True)
    receiver_info = db.relationship('Message', backref='receiver', foreign_keys="Message.receiver_id", lazy=True)
    rider_info = db.relationship('Rider', backref='users', lazy=True)


# class Conversation(db.Model):
#     __tablename__ = 'conversations'
#     id = db.Column(db.Integer, primary_key=True)
#     user_id1 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     user_id2 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    send_time = db.Column(db.DateTime, default=datetime.utcnow())
    # conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


class Rider(db.Model):
    __tablename__ = 'riders'
    id = db.Column(db.Integer, primary_key=True)
    start = db.Column(db.Float)
    end = db.Column(db.Float)
    content = db.Column(db.String(500))
    time = db.Column(db.DateTime, default=datetime.utcnow())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
