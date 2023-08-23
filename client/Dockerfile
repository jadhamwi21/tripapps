FROM node:20-alpine3.17

WORKDIR /app

RUN npm install -g npm@9.8.1

COPY ./*.json ./

RUN npm ci

COPY ./ ./

ENV NEXT_PUBLIC_API_URL=http://node_app:80

CMD ["npm","run","build"]

CMD ["npm","start"]

