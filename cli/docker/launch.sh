#!/usr/bin/bash

docker compose down
docker compose up --build -d

docker exec -it tripapps_cli sh
