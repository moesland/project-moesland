# Docker
## Introduction
Docker is a platform for developers to easily build, deploy, and run applications in containers. This readme file contains instructions for setting up a Mongo database using Docker.

## Prerequisites
Docker must be installed on your system. If you do not have Docker installed, please visit the official Docker website for installation instructions: https://www.docker.com/products/docker-desktop

## Setup
To create a Mongo database using Docker, follow these steps:

1. Navigate to the `prototype-moesland\database\mongo` directory in your terminal.
2. Run the following command to build and start the container: ```docker-compose up --build -d mongodb```

This will create a new Mongo database running in a Docker container. You can connect to the database using the appropriate client, such as MongoDB Compass.