const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../models/User");
const Address = require("../models/Address");

if (!fs.existsSync("admin_emails.json"))
  fs.writeFileSync("admin_emails.json", "[]");

const ADMIN_EMAILS = JSON.parse(fs.readFileSync("admin_emails.json")) || [];

const SALT = CryptoJS.enc.Utf8.parse(process.env.PASSWORD_SALT || "juan");
const JWT_KEY = process.env.JWT_KEY || "juan";

const registerHandler = async (req, res, next) => {
  console.log("Register Data:", req.body);
  const hashedPassword = CryptoJS.PBKDF2(req.body.password, SALT, {
    keySize: 256 / 32,
  }).toString();
  req.body.password = hashedPassword;

  const newUser = new User(req.body);
  ADMIN_EMAILS.includes(req.body.email) ? newUser.set("isAdmin", true) : {};

  try {
    const savedUser = await newUser.save();
    console.log(savedUser);

    const newAddress = new Address({ userName: req.body.userName });
    await newAddress.save();

    const token = jwt.sign(
      {
        userId: savedUser._id,
        userName: savedUser.userName,
        isAdmin: savedUser.isAdmin,
      },
      JWT_KEY,
      { expiresIn: "1d" }
    );

    // const { password, __v, ...userInfo } = savedUser._doc;
    // ! TESTING WHETHER IT RETURNS __v var
    const { password, ...userInfo } = savedUser.toObject();
    res.status(201).json({ ...userInfo, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const loginHandler = async (req, res, next) => {
  try {
    let user = req.body.userName
      ? await User.findOne({ userName: req.body.userName })
      : req.body.email
      ? await User.findOne({ email: req.body.email })
      : await User.findOne({ phoneNumber: req.body.phoneNumber });

    const loginPassword = CryptoJS.PBKDF2(req.body.password, SALT, {
      keySize: 256 / 32,
    }).toString();

    if (user.password !== loginPassword) {
      res.status(401).json({ msg: "Wrong Credentials" });
      console.error(
        "Storedpass: "
          .concat(user.password)
          .concat(" GivenPass: ")
          .concat(loginPassword)
      );
      return;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.userName,
        isAdmin: user.get("isAdmin"),
      },
      JWT_KEY,
      { expiresIn: "1d" }
    );

    const { password, __v, ...userInfo } = user._doc;
    res.status(200).json({ ...userInfo, token });
  } catch (err) {
    console.log("[Error]: ", err);
    res.status(500).json(err);
  }
};

const authController = { registerHandler, loginHandler };
module.exports = authController;
