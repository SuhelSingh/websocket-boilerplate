import os 
import numpy as np
import pandas as pd
from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
#cors = CORS(app, resources={r"/random_string": {"origins": "http://localhost:3000"}})

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