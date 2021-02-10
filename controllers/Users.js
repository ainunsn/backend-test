const Users = require("../models/Users");
const randomString = require("../utilities/random_alphanumeric");
const ValidateEmail = require("../utilities/validate_email");
const bcrypt = require("bcrypt");
const sequelize = require("sequelize");
const {
  tokenGenerator,
  compareToken,
} = require("../utilities/token_generator");

const { Op } = require("sequelize");

const saltsRound = 10;

// Create user
const createUser = async (req, res) => {
  try {
    const { email, password, username, name, referal_code } = req.body;

    let validEmail = ValidateEmail(email);

    const usernameCheck = await Users.findAll({
      where: {
        username: username,
      },
    });
    const emailCheck = await Users.findAll({
      where: {
        email: email,
      },
    });

    const checkRefCode = await Users.findAll({});
    const validRefCode = checkRefCode
      .map((i) => i.dataValues.user_referal_code)
      .filter((code) => code === referal_code).length
      ? true
      : false;

    if (
      !usernameCheck.length &&
      !emailCheck.length &&
      validEmail &&
      validRefCode
    ) {
      let new_referal_code = randomString(6);
      const salts = await bcrypt.genSalt(saltsRound);
      const hashPass = await bcrypt.hash(password.toString(), salts);

      const userData = {
        email: email,
        username: username,
        user_password: hashPass,
        user_referal_code: new_referal_code,
        full_name: name,
        user_friend_referal_code: referal_code,
      };
      await Users.create(userData);
      res.sendStatus(200);
    } else {
      res.status(400).json("Invalid field information");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    if (user.length) {
      const userData = user[0].dataValues;
      const validPass = await bcrypt.compare(
        req.body.password,
        userData.user_password
      );

      if (validPass) {
        const response = {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          referal_code: userData.user_referal_code,
          token: tokenGenerator(userData.id),
        };

        res.json(response);
      } else {
        res.json("Invalid Password");
      }
    } else {
      res.json("No user");
    }
  } catch (err) {
    res.json("Internal Server Error");
  }
};

// Update user data
const updateUser = async (req, res) => {
  try {
    const { email, password, name, username, token } = req.body;

    const id = compareToken(token);

    if (!id) {
      res.json("Unauthorize");
    } else {
      const salts = await bcrypt.genSalt(saltsRound);
      const hashPass = await bcrypt.hash(password.toString(), salts);

      const validEmail = ValidateEmail(email);
      if (validEmail) {
        await Users.update(
          { email, name, username, password: hashPass },
          {
            where: {
              id: id,
            },
          }
        );

        res.json("Updated data");
      } else {
        res.json("Invalid field information");
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getUserByName = async (req, res) => {
  try {
    const users = await Users.findAll({});
    const listUser = users.map((i) => {
      const data = {
        username: i.dataValues.username,
        full_name: i.dataValues.full_name,
        referal_code: i.dataValues.user_referal_code,
      };
      return data;
    });

    const filteredUser = listUser.filter((user) =>
      user.full_name.toLowerCase().includes(req.query.name)
    );

    res.json(filteredUser);
  } catch (err) {
    res.sendStatus(500);
  }
};

const RefCode = async (req, res) => {
  try {
    const { referal_code, token } = req.body;

    const id = compareToken(token);

    if (!id) {
      res.json("Unauthorize");
    } else {
      const userReferal = await Users.findOne({
        where: { id },
      });

      const listReferal = await Users.findAll({
        where: {
          user_referal_code: {
            [Op.ne]: userReferal.dataValues.user_referal_code,
          },
        },
      });

      const ref = listReferal
        .map((i) => i.user_referal_code)
        .filter((code) => code === referal_code).length
        ? true
        : false;
      console.log(ref);

      if (ref) {
        await Users.update(
          { user_friend_referal_code: referal_code },
          {
            where: {
              id: id,
            },
          }
        );

        res.json("Correct");
      } else {
        res.json("Invalid information");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getUserByName,
  RefCode,
};
