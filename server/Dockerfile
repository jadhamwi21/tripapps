FROM node:20-alpine3.18

WORKDIR /app


COPY ./*.json ./

RUN npm ci

COPY ./ ./

ENV NEXT_PUBLIC_API_URL=http://node_app:80

RUN npm run build

CMD ["npm","start"]