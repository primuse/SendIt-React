# Build off this base image
FROM node:latest

LABEL MAINTAINER="tikuochukwu.okoye@andela.com"

RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | \ 
  tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | \ 
  apt-key --keyring /usr/share/keyrings/cloud.google.gpg  add - && apt-get update -y && apt-get install google-cloud-sdk -y

# Set up app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install

# Bundle app source
COPY . .

RUN chmod +x jenkins/scripts/* && ./jenkins/scripts/install_docker.sh

# Run this command on startup
ENTRYPOINT ["npm", "start"]

