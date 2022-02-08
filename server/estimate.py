
        
import numpy as np
import pandas as pd
from flask_socketio import Namespace, send, emit
import json

import hashlib
def sha1(*args): 
    return hashlib.sha1('_'.join(*args).encode('utf-8')).hexdigest()

def connect():
    emit('log',{'type':'LOAD_DEBUG','debug_obj':'testing the connection'})
    emit('send_action',{'type':'LOAD_DEBUG','debug_obj':'testing the connection'})

def test(payload=None):
    emit('send_action',{'type':'LOAD_DEBUG','debug_obj':'you dirty slut'})

def start_session(payload=None):
    print(payload)
    session_id = sha1(str(payload))
    #emit('log',{'started_session':payload, 'session_id':session_id})
    #emit('send_action',{'type':'ESTIMATE._UPDATE_STATE','newState':{'sessionId':session_id}})
    #ack({'session_id':session_id})
    return {'sessionId':session_id}

def fetch_prompt(payload=None):

    newState = { 
        'n1':np.random.randint(2,100), 
        'n2':np.random.randint(2,100), 
        'promptModel':'random2digits', 
        'accuracyModel':'estimate'
    }
    print('fetch prompt:', newState, payload)
    return newState

def send_answer(payload):
    print('send_answer',payload)
    payload = json.loads(payload)
    provided_answer = float(payload['answer'])
    correct_answer = float(payload['prompt']['n1']) * float(payload['prompt']['n2'])
    pct_error = np.abs( provided_answer - correct_answer ) / (correct_answer) 
    ratio = min( provided_answer , correct_answer ) / max( provided_answer, correct_answer)
    score = 50 * ratio
    newState = {'providedAnswer':provided_answer,'correctAnswer':correct_answer, 'pctError':pct_error, 'score':score}
    #emit('send_action',{'type':'ESTIMATE._UPDATE_STATE','newState':{'review':newState }})
    return newState

def disconnect():
    print('FUCK')
    
funcs = (
    connect
    , test
    , start_session
    , fetch_prompt
    , send_answer
    , disconnect
)