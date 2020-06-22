const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/post");
const isAuthenticated = require("../../validators/authentication");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, { loginInput: { title, photo_url } }, context) {
      const user = isAuthenticated(context);
      if (title.trim() === "") {
        throw new Error("Post must have a title");
      }
      if (photo_url.trim() === "") {
        throw new Error("Post must have an Image");
      }
      const newPost = new Post({
        title,
        photo_url,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = isAuthenticated(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post Deleted Successfully";
        } else {
          throw new AuthenticationError("Action not allowed.!!");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = isAuthenticated(context);
      try {
        const post = await Post.findById(postId);
        if (post) {
          if (post.likes.find(like => like.username === username)) {
            post.likes = post.likes.filter(like => like.username !== username);
          } else {
            post.likes.push({
              username,
              createdAt: new Date().toISOString()
            });
          }
          await post.save();
          return post;
        } else throw new UserInputError("Post not found");
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
