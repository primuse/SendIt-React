#!/bin/bash

# Exit upon encountering an error
set -euo pipefail

# Set some enviroment configurations
BOLD='\e[1m'
BLUE='\e[34m'
NC='\e[0m'


info() {
    # Display output in this format
    printf "\n${BOLD}${BLUE}====> $(echo $@ ) ${NC}\n"
}
