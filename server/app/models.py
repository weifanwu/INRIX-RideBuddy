from datetime import datetime

from . import db


class Initialization:
    @staticmethod
    def db_initialization():
        db.drop_all()
        db.create_all()


class User(db.Model):
    __tablename__ = 'users'
    #     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    # name VARCHAR(255),
    # email VARCHAR(255),
    # password VARCHAR(255) NOT NULL,
    # username VARCHAR(255) NOT NULL,
    # gender VARCHAR(255),
    # age INT,
    # city VARCHAR(255),
    # occupation VARCHAR(255)
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128))

    gender = db.Column(db.String(20))
    age = db.Column(db.Integer)
    city = db.Column(db.String(100))
    occupation = db.Column(db.String(100))
    # Relationships
    conversation_info = db.relationship('Conversation', backref='users', lazy=True)
    message_info = db.relationship('Message', backref='users', lazy=True)
    rider_info = db.relationship('Rider', backref='users', lazy=True)

class Conversation(db.Model):
    __tablename__ = 'conversations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    send_time = db.Column(db.DateTime, default=datetime.utcnow())
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

class Rider(db.Model):
    __tablename__ = 'riders'
    id = db.Column(db.Integer, primary_key=True)
    start = db.Column(db.Float)
    end = db.Column(db.Float)
    content = db.Column(db.String(500))
    time = db.Column(db.DateTime, default=datetime.utcnow())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
