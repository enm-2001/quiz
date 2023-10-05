const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateAccessToken = (user) => {
   // console.log(user);
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
}

module.exports = {generateAccessToken}