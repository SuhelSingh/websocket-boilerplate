import os 
import numpy as np
import pandas as pd

from flask import Flask, render_template
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app)
#app.config['SECRET_KEY'] = 'kebob'
socketio = SocketIO(app,
    #engineio_logger=True, 
    #logger=True, 
    cors_allowed_origins='*')


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/random_string")
def random_string(n=10):
    options = 'abcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+'
    rnd_str = ''.join(
        np.random.choice(list(options),n)
    )
    return rnd_str 

@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)

@socketio.on('json')
def handle_json(json):
    print('received json: ' + str(json))
    
@socketio.on('connect')
def handle_connect(payload=None):
    print('connected: ' + str(payload))

@socketio.on('disconnect')
def handle_disconnect(payload=None):
    print('disconnected: ' + str(payload))


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0',port=5000,debug=True)