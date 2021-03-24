import os
import sys
import logging
import datetime
import click
import werkzeug.serving
from werkzeug.serving import run_simple
from webob.dec import wsgify
from webob import Response, exc
from funcy import memoize, cache
from pathlib import Path
from environs import Env

logger = logging.getLogger(__name__)

env = Env()
env.read_env()



@wsgify
def application(req):
    jobid = req.json['id']
    data = req.json['data']

    steps = 123

    resp = {
            'jobRunID': jobid,
            'data': {'steps': steps},
        }

    # resp = {
    #         'jobRunID': jobid,
    #         'status': 'errored',
    #         'error': 'There was an error: lalala',
    #         'statusCode': 500,
    #     }

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
