## this is the stage one , also know as the build step

FROM node:12 as base

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn

COPY . . 

FROM base as production

ENV NODE_PATH=./build

RUN yarn cluster