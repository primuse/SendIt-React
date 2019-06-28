# Build off this base image
FROM node:latest

LABEL MAINTAINER="tikuochukwu.okoye@andela.com"

# Set up app directory
WORKDIR /usr/src/app

# Expose the server to the host machine
EXPOSE 8080

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install

# Bundle app source
COPY . .

# Run this command on startup
ENTRYPOINT ["npm", "run", "start-dev"]
