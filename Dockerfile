FROM node:8.14-jessie

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production=true

# Bundle app source
COPY . .

EXPOSE 8080

ENV NODE_ENV=docker

CMD [ "node", "index.js" ]
