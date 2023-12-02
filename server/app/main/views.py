from datetime import datetime

from flask import Flask, request, json, jsonify
from sqlalchemy import desc
from flask_cors import CORS,cross_origin
from app import db
from app.models import User, Rider
from config import Config
from . import main
from app import distance

# Global Variables
form_start = None
form_end = None

@main.route('/')
def index():
    db.drop_all()
    db.create_all()
    # u1 = User(id=1, email="test@gmail.com", password = "123456", username="test", gender="non-binary", age=18, city="Seattle", mbti="REST")
    r1 = Rider(id=1, start=-33.8, end=442.5, content="Travel", time=datetime.utcnow(), user_id=1)
    r2 = Rider(id=2, start=-33.8, end=442.5, content="Travel", time=datetime.utcnow(), user_id=1)
    r3 = Rider(id=3, start=-33.8, end=442.5, content="Travel", time=datetime.utcnow(), user_id=1)
    # db.session.add(u1)
    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.commit()
    return "<h1 > Home Page </hi>"

@main.route('/postData', methods=['POST'])
def postData():
    global form_start
    global form_end
    data = request.get_json()
    print("Type: ", type(data['start']))
    print(data['start'], data['end'])
    form_start, form_end = data['start'], data['end']

    print("End: " + str(data['end']))
    print("Start: " + str(data['start']))
    print("Date: " + data['date'])
    print("Content: " + data['content'])

    return {"response": 'success'}


@main.route('/testGetPost', methods=['GET'])
def testGetPost():
    # get all post data from database
    # find the nearest posts for start and end position
    start, end = form_start, form_end
    data1 = distance.match(start, end)
    print("Print Matched Data",data1)

    return jsonify(data1)
    # return json.dumps(data)

@main.route('/json')
def send_json():
    data = {
        "name": "John",
        "age": 30,
        "city": "New York"
    }
    return json.dumps(data)

@main.route('/SignUp', methods=['POST', 'OPTIONS'])
@cross_origin()
def register():
    if request.method == 'OPTIONS':
        return jsonify({"message": "Prelight check successful"})
    data = request.json
    new_user = User(email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Sign Up Successful"})

@main.route('/SignIn', methods=['POST', 'OPTIONS'])
@cross_origin()
def login():
    data = request.json
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    if user:
        return jsonify({"message": "Sign In Successful"})
    else:
        return jsonify({"message": "Wrong Username or password"}), 401