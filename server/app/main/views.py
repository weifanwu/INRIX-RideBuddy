from datetime import datetime
from app.utils.auth_utils import get_token
from app.utils.find_routes import get_route
from flask import Flask, request, json, jsonify, render_template
from flask_cors import CORS, cross_origin
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash

from app import db
from app.models import User, Rider
from config import Config
from . import main

from app import distance
from app.dev._insert_database import reset, insert_all


HASH_TOKEN = 'ZTVneGF3dHc0ZHxaTzlINXpQTHZaNkN5bEI3MGswV0YyMnpXeTNDcEgwQzlUMlRZa1Zo'
APP_ID = 'e5gxawtw4d'
TOKEN_URL = 'https://api.iq.inrix.com/auth/v1/appToken'
# Global Variables
form_start = None
form_end = None


@main.route('/')
def index():
    # reset()
    # insert_all()
    return render_template('index.html')


@main.route('/findRoute', methods=['GET'])
def find_route():
    point1 = request.args.get('point1')
    point2 = request.args.get('point2')
    response, status_code = get_token()
    # If the request is successful, return the token
    if status_code == 200:
        api_token = response
        coordinates,status = get_route(point1, point2, api_token)
        if status == 200:
            return jsonify({'information': coordinates})
        else:
            return jsonify({'message': coordinates})
    else:
        return jsonify({'message': response})


@main.route('/postData', methods=['POST'])
def postData():
    global form_start
    global form_end

    # user_id = get_jwt_identity()
    data = request.get_json()
    form_start = data['start']
    form_end = data['end']
    # print(form_start, form_end)

    # # TODO: add user_id
    # new_rider = Rider(start=data['start'], end=data['end'], content=data['content'], time=datetime.utcnow(), user_id=user_id)
    # db.session.add(new_rider)
    # db.session.commit()
    return jsonify({"message": "successfully!"})


@main.route('/testGetPost', methods=['GET', 'POST'])
def testGetPost():
    # get all post data from database
    # find the nearest posts for start and end position
    global form_start
    global form_end
    start, end = form_start, form_end

    if request.method == 'GET':
        # print("GET start, end: ")
        # print(start, end)
        # data1 = distance.match(start, end)
        # print("Print Matched Data", data1)
        data1 = [
                {
                    "post_id": 1,
                    "start": [37.76166210095362, -122.44915742860624],
                    "end":  [37.76166210095362, -122.44915742860624],
                    "name": 'Jack'
                },
                {
                    "post_id": 2,
                    "start": [47.637996, -122.301823],
                    "end": [47.642065, -122.400515],
                    "name": 'Luke'
                },
                {
                    "post_id": 3,
                    "start": [47.656190, -122.324949],
                    "end": [47.653546, -122.391763],
                    "name": 'Lucy'
                }
            ]
        return jsonify(data1)
    elif request.method == 'POST':
        print("POST start, end: ")
        print(start, end)
        # bodydata = request.json
        # print(bodydata)
        data2 = distance.match(start, end)
        for _ in range(3):
            data2.pop()
        return jsonify(data2)


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

    try:
        new_user = User(name=data['name'], email=data['email'], password_hash=generate_password_hash(data['password']),
                        age=data['age'], gender=data['gender'], city=data['city'])
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"message": "Please Try Again"}), 401
    return jsonify({"message": "Sign Up Successful"}), 200


@main.route('/SignIn', methods=['POST', 'OPTIONS'])
@cross_origin()
def login():
    data = request.json

    user = User.query.filter_by(email=data['email']).first()
    if user:
        # 创建JWT令牌
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token, message="Sign In Successful")
    else:
        return jsonify({"message": "Wrong Username or Password"}), 401

