#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments provided. Please provide a number."
    exit 1
fi

version=$1

# build express server image
docker build -t neopan718/cns-express-server:$version --push -f ../src/backend-ts/dockerfile ../src/backend-ts
if [ $? -ne 0 ]; then
    echo "Failed to build neopan718/cns-express-server:$version"
    exit 1
fi

# build socket server image
docker build -t neopan718/cns-socket-server:$version --push -f ../src/chat/dockerfile ../src/chat
if [ $? -ne 0 ]; then
    echo "Failed to build neopan718/cns-socket-server:$version"
    exit 1
fi

echo "Version: $version successfully built."
