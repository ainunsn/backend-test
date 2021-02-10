const Sequelize = require('sequelize')

const db = new Sequelize("postgres://postgres:admin@localhost:5432/backend-test");


module.exports = db;
