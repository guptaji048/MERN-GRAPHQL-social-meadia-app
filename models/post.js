var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    username: {
      type: String
    },
    createdAt: {
      type: String
    },
    photo_url: {
      type: String,
      trim: true
    },
    likes: [
      {
        username: {
          type: String
        },
        createdAt: {
          type: String
        }
      }
    ],
    user: {
      type: ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
