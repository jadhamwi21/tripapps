FROM node:20-alpine3.18

WORKDIR /cli

COPY *.json ./

RUN npm i

COPY . ./

RUN npm run build

RUN chmod a+x /cli/bin/run

RUN ln -s /cli/bin/run /usr/local/bin/tripapps-cli

RUN chmod a+x /usr/local/bin/tripapps-cli

ENTRYPOINT ["tail", "-f", "/dev/null"]
