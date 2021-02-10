const Sequelize = require('sequelize')

const db = new Sequelize("backend-test", "postgres", "postgres", {
  host: "localhost",
  port: 5000,
  dialect: "postgres",
});


module.exports = db;
