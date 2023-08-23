FROM node:20-alpine3.17

WORKDIR /app

RUN npm install -g npm@9.8.1

COPY ./*.json ./

RUN npm i

RUN npm i -g typescript

COPY ./ ./


RUN npm run build

CMD ["npm","start"]