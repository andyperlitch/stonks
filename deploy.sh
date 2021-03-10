#!/bin/bash

# go to the project directory
cd ~/stonks

# pull latest code
git pull origin master

# build the docker image for the app
docker-compose -f ./docker/prod/docker-compose.yml pull
docker-compose -f ./docker/prod/docker-compose.yml up -d