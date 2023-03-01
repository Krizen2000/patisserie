const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config;

const JWT_KEY = process.env.JWT_KEY || "juan";

const verifyToken = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];

  !token && res.status(403).json({ msg: "You are not authenticated!" });
  console.log("Token: ", token);
  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) {
      res.status(401).json("Token is not valid");
      return;
    }
    console.log("[Token Value]:", user);
    req.user = user;
    next();
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!(req.user.userName === req.params.userName || req.user.isAdmin)) {
      res.status(403).json({ msg: "You are not an authorized admin" });
      return;
    }
    next();
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin) {
      res.status(403).json({ msg: "You are not an authorized admin" });
      return;
    }
    next();
  });
};

module.exports = {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
