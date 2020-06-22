require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./schemas/TypeDefs");
const resolvers = require("./schemas/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

server.listen({ port: 5000 }).then(res => {
  console.log(`Server running at ${res.port}`);
});
