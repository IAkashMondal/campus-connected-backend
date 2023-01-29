const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.Userid;
      req.body.userId = userId;
      next();
    } catch (err) {
      res.status(401).send({ msg: "Unauthorized. Login First" });
    }
  } else {
    res.status(401).send({ msg: "Unauthorized. Login First" });
  }
};

module.exports = {
  auth,
};

