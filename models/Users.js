const Sequelize = require("sequelize");
const db = require("../config/database");

const { DataTypes } = Sequelize;

// Define schema
const Users = db.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
    },
    user_password: {
      type: DataTypes.STRING,
    },
    full_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    user_referal_code: {
      type: DataTypes.STRING,
    },
    user_friend_referal_code: {
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

module.exports = Users;
