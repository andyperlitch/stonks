#!/bin/bash
DOCKER_SYNC_FILE=./docker/dev/docker-sync.yml

echo "====> Stopping the filesystem sync"
# stop and clean fs sync
docker-sync stop -c $DOCKER_SYNC_FILE
docker-sync clean -c $DOCKER_SYNC_FILE
# builds and starts the services
echo "====> Running docker-compose down"
docker-compose -f ./docker/dev/docker-compose.yml down

echo "====> Done"