import sqlalchemy
import pandas as pd
from sqlalchemy import text

class PG():
    def __init__(self, database=None,ip='host.docker.internal',port=5432,user='suhel',pw='kebob'):
        self.engine = engine = sqlalchemy.create_engine(f'postgresql://{user}:{pw}@{ip}:{port}/{database}')
        self.autocommit_engine = engine.execution_options(isolation_level="AUTOCOMMIT")
        
    def execute(self, sql):
        return self.autocommit_engine.execute(text(sql))
    
    def read(self, sql):
        return pd.read_sql(text(sql),self.autocommit_engine)
    
def get_pg(db='estimate'):
    return PG(database=db)

pg = get_pg()
    
    