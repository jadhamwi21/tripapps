FROM node:20-alpine3.18 AS build

WORKDIR /app

COPY *.json ./

RUN npm i

COPY ./ ./

RUN npm run build

FROM node:20-alpine3.18 AS final

WORKDIR /app

COPY --from=build /app/*.json ./
RUN npm ci

COPY --from=build /app/build ./build

USER node

CMD ["node","./build/app.js"]
