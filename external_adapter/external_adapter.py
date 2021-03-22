import os
import sys
import logging
import datetime
import click
import werkzeug.serving
from werkzeug.serving import run_simple
from webob.dec import wsgify
from webob import exc
from funcy import memoize, cache
from pathlib import Path
from environs import Env

logger = logging.getLogger(__name__)

env = Env()
env.read_env()


def execute_adapter(req):
    return "ok"


@wsgify
def application(req):
    if req.path == "/":
        return execute_adapter(req)
    raise exc.HTTPNotFound


def make_app(use_debugger=False, serve_static=True):
    app =  application

    if serve_static:
        static_root = os.path.join(os.path.dirname(__file__), "static")
        app = WhiteNoise(app, root=static_root, prefix='static/')

    return app

wsgi_app = make_app()

@click.command()
def cli_runserver():
    host = env("HOST", '0.0.0.0')
    port = env.int("PORT", 8000)
    logger.info(
        "Starting External Adapter Server on port {}".format(port)
    )

    run_simple(host, port, wsgi_app, use_debugger=True, use_reloader=True)



if __name__ == "__main__":
    cli_runserver()
