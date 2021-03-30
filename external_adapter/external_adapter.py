import os
import sys
import logging
import time
import datetime
import json
import base64
import click
import werkzeug.serving
from werkzeug.serving import run_simple
from webob.dec import wsgify
from webob import Response, exc
from funcy import memoize, cache
from pathlib import Path
from environs import Env
from google_auth_oauthlib.flow import Flow
import googleapiclient.discovery
import google.oauth2.credentials
import redis

logger = logging.getLogger(__name__)

env = Env()
env.read_env()


rdb = redis.Redis(host=env("REDIS_HOST"),
                port=env.int("REDIS_PORT", 6379),
                db=env.int("REDIS_DB", 0))

@wsgify
def application(req):
    jobid = req.json['id']
    data = req.json['data']
    requester = data['requester']
    print("requester", requester)
    # import pdb; pdb.set_trace()
    # resp = {
    #         'jobRunID': jobid,
    #         'status': 'errored',
    #         'error': 'There was an error: lalala',
    #         'statusCode': 500,
    #     }

    encoded_credentials_dict = rdb.get(requester.encode('utf-8').lower())
    credentials_dict = json.loads(base64.b64decode(encoded_credentials_dict.decode('ascii')))

    TODAY = datetime.datetime.today().date()
    NOW = datetime.datetime.today()
    START = int(time.mktime(TODAY.timetuple())*1000000000)
    END = int(time.mktime(NOW.timetuple())*1000000000)
    DATA_SET = "%s-%s" % (START, END)
    DATA_SOURCE = "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"

    credentials = google.oauth2.credentials.Credentials(**credentials_dict)

    fitness_service = googleapiclient.discovery.build('fitness', 'v1', credentials=credentials)

    resp = (fitness_service
            .users()
            .dataSources()
            .datasets()
            .get(userId='me', dataSourceId=DATA_SOURCE, datasetId=DATA_SET)
            .execute())


    steps = sum([p['value'][0]['intVal'] for p in resp['point']])
    resp = {
            'jobRunID': jobid,
            'data': {'steps': steps},
        }

    return Response(content_type="application/json", json_body=resp, status=200)


@click.command()
def cli_runserver():
    host = env("HOST", '0.0.0.0')
    port = env.int("PORT", 8000)
    logger.info(
        "Starting External Adapter Server on port {}".format(port)
    )

    run_simple(host, port, application, use_debugger=True, use_reloader=True)



if __name__ == "__main__":
    cli_runserver()
