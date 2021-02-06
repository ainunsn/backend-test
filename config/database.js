const Sequelize = require('sequelize')

const db = new Sequelize("backend-test", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});


module.exports = db;
