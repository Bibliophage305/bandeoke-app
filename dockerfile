FROM node:18-alpine
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn