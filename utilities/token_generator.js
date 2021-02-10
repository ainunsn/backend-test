const jwt = require('jsonwebtoken')
require('dotenv').config()

function tokenGenerator(id) {
    const token = jwt.sign({id: id}, process.env.secret_token, {expiresIn: '1h'})

    return token
}


function compareToken(token) {
    let result;
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        result = false;
      } else {
        result = decoded.id;
      }
    });
  
    return result;
  }


module.exports =  {tokenGenerator, compareToken};