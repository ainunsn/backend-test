CREATE DATABASE "backend-test";

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_referal_code VARCHAR(255),
    user_password VARCHAR(255),
    user_friend_referal_code VARCHAR(255) DEFAULT NULL

);