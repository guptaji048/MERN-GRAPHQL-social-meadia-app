const postResolvers = require("./post");
const userResolvers = require("./user");

module.exports = {
  Post: {
    likeCount: parent => parent.likes.length
  },
  Query: {
    ...postResolvers.Query,
    ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation
  }
};
