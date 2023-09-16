FROM node:20-alpine3.18

WORKDIR /cli

COPY *.json .

RUN npm i

COPY . .

RUN npm run build

RUN ln -s /cli/bin/run /usr/local/bin/tripapps-cli

ENV MONGODB_URL=mongodb://db:27017/tripapps

ENTRYPOINT ["tail", "-f", "/dev/null"]
