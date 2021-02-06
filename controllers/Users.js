const Users = require("../models/Users");
const randomString = require("../utilities/random_alphanumeric");
const ValidateEmail = require("../utilities/validate_email");
const bcrypt = require("bcrypt");
const sequelize = require("sequelize");
const {
  tokenGenerator,
  compareToken,
} = require("../utilities/token_generator");

const saltsRound = 10;

// Create user
const createUser = async (req, res) => {
  try {
    const { email, password, username, referal_code, name } = req.body;

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

    if (!usernameCheck.length && !emailCheck.length && validEmail) {
      let new_referal_code = randomString(6);
      const salts = await bcrypt.genSalt(saltsRound);
      const hashPass = await bcrypt.hash(password.toString(), salts);

      const userData = {
        email: email,
        username: username,
        password: hashPass,
        referal_code: new_referal_code,
        name: name,
      };
      await Users.create(userData);
      res.sendStatus(200);
    } else {
      res.status(400).json("Invalid field information");
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findAll({
      where: {
        email: email,
      },
    });

    if (user.length) {
      const userData = user[0].dataValues;
      const validPass = await bcrypt.compare(password, userData.password);

      if (validPass) {
        const response = {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          referal_code: userData.referal_code,
          token: tokenGenerator(userData.id),
        };

        res.json(response);
        loginUser();
      } else {
        res.json("Invalid Password");
      }
    } else {
      res.json("No user");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
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

// Get product berdasarkan id
const getUserByName = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: sequelize.where(
        sequelize.fn("lower", sequelize.col("name")),
        sequelize.fn("lower", req.query.name)
      ),
    });

    const listUser = user.map((item) => ({
      id: item.id,
      username: item.username,
      email: item.username,
      referal_code: item.referal_code,
      name: item.name,
    }));

    res.json(listUser);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getUserByName,
};
