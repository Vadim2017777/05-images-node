const multer = require("multer");
const path = require("path");

exports.avatarUpdate = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/images"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}.png`);
    },
  });

  return multer({ storage });
};
