docker run -d --name tripapps_mongodb_c -v /data:/data/db --hostname mongo_db --network tripapps-network mongo
docker run -d --name tripapps_cli_c --network tripapps-network tripapps-cli:latest
docker run -d --name tripapps_node_app_c -p 80:80 --network tripapps-network --hostname node_app tripapps-node:latest
