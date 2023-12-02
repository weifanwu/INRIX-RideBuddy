from flask import request
from flask_socketio import SocketIO, emit
from app import create_app, db
from flask_cors import CORS

app = create_app('development')
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

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
