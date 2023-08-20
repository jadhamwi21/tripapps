FROM node:20-alpine3.17

WORKDIR /app

RUN npm install -g npm@9.8.1

COPY ./*.json ./

RUN npm ci

COPY ./ ./

ENV PORT=80
ENV MONGODB_URL=mongodb:27017/tripapps

RUN npm run build

CMD ["npm","start"]