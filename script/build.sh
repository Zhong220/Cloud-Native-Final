#!/bin/bash

# Variables
AUTHOR="neopan718"
ROOT="$(dirname "$(dirname "$(realpath "$0")")")"
EXPRESS_FOLDER="$ROOT/src/backend-ts"
EXPRESS_IMAGE="$AUTHOR/cns-express-server"
SOCKET_FOLDER="$ROOT/src/chat"
SOCKET_IMAGE="$AUTHOR/cns-socket-server"

if [ $# -eq 0 ]; then
    echo "No version number provided."
    echo "Current version: $(cat "$ROOT/docs/version.txt")"

    # input validation
    while true; do
        read -p "Enter new version number: " VERSION
        if [[ $VERSION =~ ^[0-9]+\.[0-9]+$ ]] || [[ $VERSION == "latest" ]]; then
            echo "Build version: $VERSION"
            break
        else
            echo "Invalid version number. Enter in the format X.Y (e.g., 1.1)."
        fi
    done

else
    VERSION=$1
fi

# build express server image
docker build -t $EXPRESS_IMAGE:$VERSION --push -f "$EXPRESS_FOLDER/dockerfile" "$EXPRESS_FOLDER" &
pid1=$!

# build socket server image
docker build -t $SOCKET_IMAGE:$VERSION --push -f "$SOCKET_FOLDER/dockerfile" "$SOCKET_FOLDER" &
pid2=$!

# wait for both builds to finish
wait $pid1
if [ $? -ne 0 ]; then
    echo "Failed to build $EXPRESS_IMAGE:$VERSION."
    exit 1
fi

wait $pid2
if [ $? -ne 0 ]; then
    echo "Failed to build $SOCKET_IMAGE:$VERSION."
    exit 1
fi

# Check if images exist on Docker Hub
if ! docker pull $EXPRESS_IMAGE:$VERSION >/dev/null 2>&1; then
    echo "Failed to find $EXPRESS_IMAGE:$VERSION on Docker Hub."
    exit 1
else
    echo "Found $EXPRESS_IMAGE:$VERSION on Docker Hub."
fi

if ! docker pull $SOCKET_IMAGE:$VERSION >/dev/null 2>&1; then
    echo "Failed to find $SOCKET_IMAGE:$VERSION on Docker Hub."
    exit 1
else
    echo "Found $SOCKET_IMAGE:$VERSION on Docker Hub."
fi

echo "Version $VERSION successfully built and push to docker hub."
