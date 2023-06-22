FROM node:18.16.0-alpine

WORKDIR /usr

COPY index.html ./
COPY server.js ./

EXPOSE 8888

ENTRYPOINT node server.js