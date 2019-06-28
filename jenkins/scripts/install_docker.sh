#!/usr/bin/env bash

# Exit upon encountering an error
set -euo pipefail

apt-get update -y

su -

apt-get install sudo -y

usermod -aG sudo $(whoami)

sudo apt-get update -y

sudo apt-get -y install \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg2 \
  software-properties-common

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -

sudo apt-key fingerprint 0EBFCD88

sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/debian \
  $(lsb_release -cs) \
  stable"

sudo apt-get update -y

sudo apt-get -y install docker-ce docker-ce-cli containerd.io