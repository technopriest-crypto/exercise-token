#!/bin/bash

# test shell script to restart docker packages and redeploy all of the smart Contracts

docker stop $(docker ps -a)

docker-compose up -d
