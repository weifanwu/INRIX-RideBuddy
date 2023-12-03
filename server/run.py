from flask_socketio import SocketIO, emit
from app import create_app, db
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from dotenv import load_dotenv
import os

load_dotenv('.env.local')

app = create_app('development')
CORS(app, supports_credentials=True)
# congfig JWT
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
app.config['JWT_REFRESH_COOKIE_PATH'] = '/token/refresh'
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_ACCESS_CSRF_COOKIE_PATH'] = '/'
app.config['JWT_REFRESH_CSRF_COOKIE_PATH'] = '/token/refresh'
app.config['JWT_COOKIE_SECURE'] = False
app.config['JWT_COOKIE_SAMESITE'] = 'None'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = False
# secret key
app.config['JWT_SECRET_KEY'] = 'your-secret-key' 
# app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")


# Your models and routes go here...
@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit("connected")


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


@socketio.on('message')
def handle_message(message):
    print('Received message:', message)
    emit('message', message, broadcast=True)


if __name__ == '__main__':
    # Use socketio.run instead of app.run
    socketio.run(app, debug=True)
