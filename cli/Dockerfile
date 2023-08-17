FROM node:20-alpine3.18 as builder


WORKDIR /app

COPY ./*.json ./

RUN npm ci

COPY . .

RUN npm run build


ENTRYPOINT ["tail","-f","/dev/null"]
