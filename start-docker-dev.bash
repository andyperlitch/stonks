#!/bin/bash

# start the sync process
docker-sync start
npm run docker:dev
docker exec -it stonks_app /bin/bash --init-file docker/dev/.profile