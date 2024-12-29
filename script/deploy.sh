#!/bin/bash

# read -p "Enter version number: " version
version_file="../docs/version.txt"

if [[ -f $version_file ]]; then
    current_version=$(cat $version_file)
    echo "Current version: $current_version"
else
    echo "Version file not found."
    exit 1
fi

read -p "Enter version number: " version

if [[ $version =~ ^[0-9]+\.[0-9]+$ ]]; then
    echo "Deployment version: $version"
else
    echo "Invalid version number. Enter in the format X.Y (e.g., 1.1)"
    exit 1
fi

./build.sh $version
if [[ $? -eq 0 ]]; then
    echo $version >$version_file
    echo "Build and deployment successful."
else
    echo "Build failed. Version not updated."
    exit 1
fi
