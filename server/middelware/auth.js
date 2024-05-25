const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ msg: "Unauthorized" });
    }

    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).send({ msg: "Token expired" });
        } else {
          return res.status(500).send({ msg: "Invalid token" });
        }
      }

      req.account = decoded;
      next();
    });
  } catch (error) {
    res.status(500).send({ msg: "An error occurred", error });
  }
};

module.exports = verifyToken;
