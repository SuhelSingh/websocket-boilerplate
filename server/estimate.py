
        
import numpy as np
import pandas as pd
from flask_socketio import Namespace, send, emit
from flask import request
import json
import functools
import pandas as pd

from db.database import db_session
from db.models import (Session, Interactions, RawEventLog)

import hashlib
def sha1(*args): 
    return hashlib.sha1('_'.join(args).encode('utf-8')).hexdigest()

def capture_raw_event(func):
    
    @functools.wraps(func)
    def wrapper(*args,**kwargs):
        ### Before
        data = {
            'event_name':func.__name__,
            'inputs':None if (len(args) == 0) else args[0],
            'outputs':None,
            'meta':{'timestamp':pd.Timestamp.now().isoformat(), 'socket_id':request.sid}
        }
        ###

        outputs = func(*args,**kwargs)

        ### After
        data['outputs'] = outputs
        re = RawEventLog(**data)
        db_session.add(re)
        db_session.commit()
        ###
        
        return outputs
    return wrapper

def get_estimate_functions():

    @capture_raw_event
    def connect():
        emit('log','acknowledging backend_connect')

    def test(payload=None):
        emit('send_action',{'type':'LOAD_DEBUG','debug_obj':'check this yo'})

    @capture_raw_event
    def start_session(payload=None):
        
        s = Session(
            socket_id=request.sid,
            session_tag=payload['sessionTag'],
            user=payload['userName'])
        db_session.add(s)
        db_session.commit()
        
        session_id = s.session_id
        return session_id

    @capture_raw_event
    def fetch_prompt(payload=None):
        newState = { 
            'n1':np.random.randint(2,100), 
            'n2':np.random.randint(2,100), 
            'promptModel':'random2digits', 
            'accuracyModel':'estimate'
        }
        return newState

    @capture_raw_event
    def send_answer(payload):
        
        ### Calculate accuracy and response
        provided_answer = float(payload['answer'])
        correct_answer = float(payload['prompt']['n1']) * float(payload['prompt']['n2'])
        pct_error = np.abs( provided_answer - correct_answer ) / (correct_answer) 
        ratio = min( provided_answer , correct_answer ) / max( provided_answer, correct_answer)
        score = 50 * ratio
        newState = {'providedAnswer':provided_answer,'correctAnswer':correct_answer, 'pctError':pct_error, 'score':score}
        
        ### Send to db
        i = Interactions(
            session_id = payload['sessionId']
            , prompt = payload['prompt']
            , response = { k:v for k,v in payload.items() 
                         if k not in ['sessionId','prompt']}
            , review = newState
        )
        db_session.add(i)
        db_session.commit()
            
        return newState

    @capture_raw_event
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
    
    for func in funcs:
        print(func.__name__)
        
    return funcs
    
funcs = get_estimate_functions()