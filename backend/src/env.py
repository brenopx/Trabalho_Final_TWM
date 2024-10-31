import os
import json

class Enviroment:
    '''enviroment variables'''

    DATABASE_URL = os.getenv('CONF_DATABASE_URL', default='sqlite:///db/sql_app.db')
    '''`DATABASE_URL` (str): The SQL URL to find the `sql_app.db` file.
    Default is `"sqlite:///db/sql_app.db"`'''

    API_NAME = os.getenv('API_NAME', default='')
    '''`API_NAME` (str): The name of the API route formated as 
    `/{name}/{version}`. Default is blank `""`'''