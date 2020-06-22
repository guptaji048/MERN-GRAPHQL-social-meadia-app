var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true
    },
    password: {
      type: String
    },
    username: {
      type: String,
      unique: true,
      trim: true
    },
    createdAt: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
