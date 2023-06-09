const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");
  try {
    if (decoded) {
      req.body.userID = decoded.userID;
      next();
    } else {
      res.status(400).send({ msg: "Authentication failed" });
    }
  } catch (err) {
    res.status(400).send({ msg: "Authentication failed" });
  }
};

module.exports = { auth };
