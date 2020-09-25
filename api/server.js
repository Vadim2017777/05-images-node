const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouterAuth = require("./auth/auth.routers");
const userRouter = require("./user/user.routers");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

module.exports = class UsersServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.startListening();
  }

  async initServer() {
    try {
      this.server = express();
      await mongoose.connect(process.env.MONGDB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("Database connection successful");
      this.server.use(morgan("combined"));
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: process.env.PORT }));
    this.server.use(express.static(__dirname + "/public"));
  }

  initRoutes() {
    this.server.use("/auth", userRouterAuth);
    this.server.use("/users", userRouter);
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log(`Start listening on port ${process.env.PORT}`);
    });
  }
};
