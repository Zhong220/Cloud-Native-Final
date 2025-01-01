#!/bin/bash

# Variables
CLUSTER_NAME="CNS_GroupUp"
SERVICE_NAME="your-service-name"
TASK_DEFINITION="your-task-definition"

# Function to check exit code
check_exit_code() {
    if [ $? -ne 0 ]; then
        echo "Error: $1 failed."
        exit 1
    fi
}

# Update ECS Service
echo "Updating ECS Service..."
aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_NAME --force-new-deployment
check_exit_code "Updating ECS Service"

# Register new task definition
echo "Registering new task definition..."
aws ecs register-task-definition --cli-input-json file://$TASK_DEFINITION
check_exit_code "Registering new task definition"

# Update ECS Service with new task definition
echo "Updating ECS Service with new task definition..."
aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_NAME --task-definition $TASK_DEFINITION
check_exit_code "Updating ECS Service with new task definition"

echo "Update complete."
# Wait for the service to stabilize
echo "Waiting for the service to stabilize..."
aws ecs wait services-stable --cluster $CLUSTER_NAME --services $SERVICE_NAME
check_exit_code "Waiting for the service to stabilize"

echo "ECS Deployment complete."
