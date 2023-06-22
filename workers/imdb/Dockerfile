FROM node:18.16.0-alpine

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./

COPY src ./src
RUN npm install 

ENV PORT=8000
ENV WORKER=worker

RUN echo "Running in port $PORT"
RUN npm run build 

ENTRYPOINT npm run start