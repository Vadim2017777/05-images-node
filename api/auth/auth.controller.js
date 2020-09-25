const userModel = require("../user/user.model");
const { usersValadation } = require("../user/users.validation");
const bcrypjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { generateAvatar } = require("../helpers/avatarGenerator");

class UserAuthController {
  constructor() {
    this._costFactor = 4;
  }

  get createUser() {
    return this._createUser.bind(this);
  }

  async _createUser(req, res, next) {
    try {
      const { email, password, subscription } = req.body;

      const { error } = usersValadation.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }
      const existEmail = await userModel.findOne({ email });
      if (existEmail) {
        res.status(400).json({ message: "Email in use" });
        return;
      }

      const passwordHash = await bcrypjs.hash(password, this._costFactor);

      const contact = await userModel.create({
        email,
        password: passwordHash,
        subscription,
        avatarURL: await generateAvatar(),
      });

      return res.status(201).json({
        email,
        subscription,
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async logIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const { error } = usersValadation.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }
      const user = await userModel.findOne({ email });

      if (!user) {
        res.status(404).send("Email or password is wrong");
        return;
      }
      const isPasswordValid = await bcrypjs.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(404).send("Email or password is wrong");
        return;
      }
      const newToken = await jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 172800 }
      );

      const updateUserToken = await userModel.findByIdAndUpdate(
        user._id,
        {
          token: newToken,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        token: newToken,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async logOut(req, res, next) {
    try {
      const user = req.user;

      const updateUserToken = await userModel.findByIdAndUpdate(
        user._id,
        {
          token: null,
        },
        {
          new: true,
        }
      );
      return res.status(204).send();
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = UserAuthController;
