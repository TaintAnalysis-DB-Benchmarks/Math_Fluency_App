Copyright 2019 SER401 Project 14 Team - All Rights Reserved

# Team Members: 
 - RAYMOND ACEVEDO
 - SHAWN WEINER
 - CHRISTOPHER SALAZAR
 - ROBERT PILLITTERI
 - SHELTON LACY 

Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential


# mathapp_backend
 Backend Development for mathapp ASU Capstone Project

# See below for Docker instructions
 
# Requirements
 - Node v10.15.3
 - NPM v6.4.1
 - MySQL (current - see note on installation below)
 - Apache Ant v1.10.5 (optional for ant build scripts)
 - Java SE 1.8.0_202 (optional for ant build scripts)

# Installation
1. Install MySQL, Node.js, and NPM (Apache Ant and Java SE are optional)
    1. Note:  MySQL version 8.0 and higher has changed authentication methods.  AWS has `mysql_native_password` enabled by default. 
    Please ensure when installing MySQL 8.0 or greater that you choose to use the `mysql_native_password` authentication.  If during database installation
    you recieve an error similar to: "Client does not support authentication protocol requested by server" your MySQL installation has the new 
    authentication enabled.  Review several fixes [here](https://medium.com/@crmcmullen/how-to-run-mysql-8-0-with-native-password-authentication-502de5bac661).
2. Download source code or clone the repository.
3. For local development
    1. Copy `.env-sample` to `.env`
    2. Update values in the new `.env` file to match the local environment or desired settings
4. If using `database_setup.js` please update the `ADMIN_USER` and `ADMIN_PASSWORD` constants in the `.env` file for an account with admin privileges on the MySQL db
5. For AWS Deployment, use the `ant aws` command in the base directory - this will assemble the correct package for uploading to AWS Elastic Beanstalk under `aws/mathapp.zip` - Just upload this zip file. 
    1. Review the `.env_sample` file - I've adjusted the files to use the default RDS_ environment variables supplied by Elastic Beanstalk
6. In root directory type the following commands:
    1. yarn install (only once, on initial install)
    2. node database_setup.js (only once, on initial install, if needed)
    3. npm start
7. Application will listen on port indicated by the environment variable PORT specified in .env or by default 8000

# Docker
This application has been updated to work with docker-compose, and as such if you want to deploy this using docker, please use the following information:

## Requirements (Docker)
1. Java Development Kit (JDK v8 or higher)
2. Apache Ant
3. Docker (w/ docker-compose)

## Settings
1. The docker-compose loads all of the relevant environment variables - if needed or desired please update the environment variables to match your system settings.

## Running the app
1. In the app base directory, run the command 'ant docker.start' - please be aware that there is a large delay in getting the node application running - due to the development environment, it runs 'npm install' each time it starts the containers.  Please wait until you get the console logging indicating the node application has started successfully.
2. To stop the application use 'ant docker.stop'

# API Documentation
1. API Documentation is served via Swagger UI at the base URL for the API Server.  It has been formally written in the OpenAPI3 standard.
 
