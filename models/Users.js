const Sequelize = require('sequelize');
const db = require('../config/database');

const { DataTypes } = Sequelize;

// Define schema
const Users = db.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    referal_code: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  },
  {
    freezeTableName: true,
  }
);

module.exports =  Users;
