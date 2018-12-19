# Chatter

A real-time web-based chatting application.

## Project Plan

This project is a personal project to learn about a number of technologies, including but not limited to:
- webpack
- vue
- websockets
- express
- docker
- nginx
- hosting a webserver
- website security

## Dockerised Deployment

### Pre-requisites

Docker-CE  
Docker-compose  

### Running Docker Containers

    git clone git@github.com:mattdriver123/chatter.git
    cd chatter
    docker-compose up

### Accessing the App

Docker exposes the app on the host's port 80.  
If you're running docker locally, this means you can open up your browser and go to `http://localhost:80`.  

## Manual deployment

### Pre-requisites

Node.js (v10.13.0 at the time of writing)  
NPM (v6.4.1 at the time of writing)  

### Installation

    git clone git@github.com:mattdriver123/chatter.git
    cd chatter/webserver
    npm i

### Running the webserver

    npm start

### Building the Vue components

    npm run webpack

### Accessing the App

The app listens on the host's port 8000.  
If you're running the app locally, this means you can open up your browser and go to `http://localhost:8000`.  
