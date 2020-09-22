const express = require("express");
const userRouter = express.Router();
const UserController = require("./users.controller");

const user = new UserController();

userRouter.post("/register", user.createUser);
userRouter.put("/login", user.logIn);
userRouter.patch("/logout", user.authorize, user.logOut);
userRouter.get("/current", user.authorize, user.getCurrentUser);

module.exports = userRouter;
