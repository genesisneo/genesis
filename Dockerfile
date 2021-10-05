FROM node:14.18-alpine AS builder
LABEL maintainer="genesis"

RUN apk update
RUN apk add --no-cache bash git openssh curl vim
RUN apk upgrade

WORKDIR /app

# install yarn
RUN rm /usr/local/bin/yarn
RUN rm -rf /usr/local/bin/yarnpkg
RUN npm i -gq yarn@1.22.15 --unsafe-perm

# install app dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn

# copy source files
COPY . .

RUN yarn run build
RUN rm -rf /app/.git

FROM node:14.18-alpine
WORKDIR /app
ARG COMMIT_HASH=docker
ENV VERCEL_GITHUB_COMMIT_SHA=$COMMIT_HASH
COPY --from=builder /app .
EXPOSE 3000
CMD yarn start
