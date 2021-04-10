#!/bin/sh

cd /home/app
pip3 install -r requirements.txt

exec "$@"
