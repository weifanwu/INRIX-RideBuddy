from flask import Flask, request, json, jsonify, render_template
from flask_cors import CORS, cross_origin
from sqlalchemy.exc import IntegrityError

from app import db
from app.utils.auth_utils import get_token
from app.models import *
from . import main
from app import distance
from app.dev._insert_database import reset, insert_all

# Global Variables
form_start = None
form_end = None


@main.route('/')
def index():
    reset()
    insert_all()
    return render_template('index.html')


@main.route('/getToken', methods=['GET'])
def display_token():
    # This makes the call to the get_token function in the auth_utils.py file
    response, status_code = get_token()
    # If the request is successful, return the token
    if status_code == 200:
        api_token = response
        return jsonify({'message': api_token})
    # If the request fails, return the error message
    else:
        return jsonify({'message': response})


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
    print("Print Matched Data", data1)

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
    try:
        new_user = User(name=data['name'], email=data['email'], password=generate_password_hash(data['password']),
                        age=int(data['age']), gender=data['gender'], city=data['city'])
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
    if check_password_hash(user.password_hash, data['password']):
        return jsonify({"message": "Sign In Successful"}), 200
    else:
        return jsonify({"message": "Wrong Username or Password"}), 401
