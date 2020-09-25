const userModel = require("../user/user.model");
const jwt = require("jsonwebtoken");

exports.authorize = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    const token = authorizationHeader.replace("Bearer ", "");

    let userId;
    try {
      userId = await jwt.verify(token, process.env.JWT_SECRET).id;
      console.log(userId);
    } catch (err) {
      res.status(401).send("User not authorized");
    }

    const user = await userModel.findById(userId);
    if (!user || user.token !== token) {
      res.status(401).send("User not authorized");
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    next(err);
  }
};
