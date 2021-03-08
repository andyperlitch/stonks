#!/bin/bash
DOCKER_SYNC_FILE=./docker/dev/docker-sync.yml

echo "====> Starting the filesystem sync"
# stop and clean fs sync
docker-sync stop -c $DOCKER_SYNC_FILE
docker-sync clean -c $DOCKER_SYNC_FILE
# this name must match name of mount in docker-sync file
docker volume create --name=stonks_app-sync
# start the sync
docker-sync start -c $DOCKER_SYNC_FILE
# builds and starts the services
echo "====> Running docker-compose"
docker-compose -f ./docker/dev/docker-compose.yml up -d
# enter into the dev container
echo "====> Entering app dev container"
# name of the container must match container_name in docker-compose file
docker exec -it stonks_app bash --init-file docker/dev/.profile
