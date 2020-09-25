const fs = require("fs");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,
  avatarURL: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: String,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
