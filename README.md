# Getting Started with the API


## Setup PosgreSQL Database
open Command Prompt and run
`psql -U postgres`
enter password: `{YOUR_PASSWORD}`
 1. Create database using `CREATE DATABASE "backend-test";`
 2. Log into backend-test database use `\c`
 3. Create table users using this command
    `CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_referal_code VARCHAR(255),
    user_password VARCHAR(255),
    user_friend_referal_code VARCHAR(255) DEFAULT NULL
);`



## Setup NodeJS
on Command Prompt please run
 1. Clone this repository
 2. run command `yarn install` to install all dependencies
 3. run command `yarn start` to start server


API documentation available here: https://documenter.getpostman.com/view/9400606/TW77fNTD




