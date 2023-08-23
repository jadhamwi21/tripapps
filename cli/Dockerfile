FROM node:20-alpine3.18


WORKDIR /app

COPY ./*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm link


ENTRYPOINT ["tail","-f","/dev/null"]
