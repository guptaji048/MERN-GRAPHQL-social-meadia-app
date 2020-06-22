const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Post {
    id: ID!
    title: String!
    username: String!
    createdAt: String!
    photo_url: String!
    likes: [Like]!
    likeCount: Int!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  input RegisterInput {
    password: String!
    confirmPass: String!
    email: String!
    username: String!
  }
  input LoginInput {
    title: String!
    photo_url: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUser(userId: ID!): User
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(loginInput: LoginInput): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!
  }
`;
