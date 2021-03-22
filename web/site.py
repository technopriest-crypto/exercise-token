import os
import sys
import logging
import datetime
import click
import jinja2
import werkzeug.serving
from whitenoise import WhiteNoise
from werkzeug.debug import DebuggedApplication
from werkzeug.middleware.shared_data import SharedDataMiddleware
from werkzeug.serving import run_simple
from webob.dec import wsgify
from webob import exc
from funcy import memoize, cache
from pathlib import Path
from environs import Env

logger = logging.getLogger(__name__)
env = Env()
env.read_env()
# ------- initialization -------


templates_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(
        [os.path.join(os.path.dirname(__file__), "templates")]
    ),
    autoescape=jinja2.select_autoescape(["html", "xml"]),
)


# @memoize
def get_template(template_name):
    return templates_env.get_template(template_name)


@cache(60 * 60)
def home(req):
    return get_template('home.html').render(current_year=datetime.datetime.now().year)


@wsgify
def application(req):
    if req.path == "/":
        return home(req)
    raise exc.HTTPNotFound


def make_app(use_debugger=False, serve_static=True):
    app =  application
    # if use_debugger:
    #     logger.info("Using Debugger")
    #     app = DebuggedApplication(app)

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
        "Starting Web Frontend Server on port {}".format(port)
    )



    run_simple(host, port, wsgi_app, use_debugger=True, use_reloader=True)



if __name__ == "__main__":
    cli_runserver()
