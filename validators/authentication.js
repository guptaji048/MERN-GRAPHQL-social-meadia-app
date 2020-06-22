const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
require("dotenv").config();

module.exports = context => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    } else {
      throw new Error("Authorization token must be 'Bearer [token]");
    }
  } else {
    throw new Error("Authorization header must be provided");
  }
};
