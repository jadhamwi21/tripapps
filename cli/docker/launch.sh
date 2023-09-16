#!/bin/bash
IMAGE_NAME="tripapps-cli"
MONGODB_URL="mongodb://db:27017/tripapps"

build-image() {
    if ! docker images --format '{{.Repository}}' | grep -q "$IMAGE_NAME$"; then
        docker build -t "$IMAGE_NAME" -f ./Dockerfile ../
    fi
}

build-image

CONTAINER_ID=$(docker run -e MONGODB_URL="$MONGODB_URL" -d --network=tripapps_network "$IMAGE_NAME")

docker exec -it "$CONTAINER_ID" sh
