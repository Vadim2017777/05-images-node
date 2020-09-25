const express = require("express");
const userRouter = express.Router();
const UserController = require("./user.controller");
const { avatarUpdate } = require("../helpers/avatarUpdate");
const { authorize } = require("../helpers/authToken");
const user = new UserController();

userRouter.get("/current", authorize, user.getCurrentUser);
userRouter.patch(
  "/avatar",
  authorize,
  avatarUpdate().single("avatar"),
  user.updateAvatar
);

module.exports = userRouter;
