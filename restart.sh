#!/bin/bash

# Stop and remove containers
docker-compose down

# Rebuild Docker images
docker-compose build

# Start containers
docker-compose up -d
