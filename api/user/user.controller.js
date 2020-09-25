const userModel = require("./user.model");
const bcrypjs = require("bcryptjs");
var jwt = require("jsonwebtoken");

class UserController {
  constructor() {}

  async getCurrentUser(req, res, next) {
    const { email, subscription } = req.user;
    try {
      return res.status(200).json({ email, subscription });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateAvatar(req, res, next) {
    try {
      const user = req.user;
      const updateUserAvatar = await userModel.findByIdAndUpdate(
        user._id,
        {
          avatarURL: `http://localhost:3000/images/${req.file.filename}`,
        },
        {
          new: true,
        }
      );
      res.status(200).send(`avatarURL:${user.avatarURL}`);
      next();
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = UserController;
