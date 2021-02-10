# Getting Started with the API


## Setup NodeJS for in Docker
on Command Prompt please run
`docker build -t backend-test .`
`docker run -p 3000:3000 -d backend-test`


API documentation available here: https://documenter.getpostman.com/view/9400606/TW77fNTD

## Setup PosgreSQL in Docker
open Command Prompt
run postgresql for Docker in Command Prompt `docker run --name pg-docker --rm -p 5000:5432 -e POSTGRES_PASSWORD={YOUR_PASSWORD_FOR_POSGREST_DOCKER} -e POSTGRES_USER={YOUR_USERNAME_FOR_POSTGRES_DOCKER} -d postgres`



then run `psql -h localhost -p 5000 -U {YOUR_USERNAME_FOR_POSTGRES_DOCKER} postgres` 

on cmd enter `{YOUR_PASSWORD_FOR_POSGREST_DOCKER}`



run
1. CREATE DATABASE "backend-test";
2. \c backend-test
3. CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_referal_code VARCHAR(255),
    user_password VARCHAR(255),
    user_friend_referal_code VARCHAR(255) DEFAULT NULL

);




