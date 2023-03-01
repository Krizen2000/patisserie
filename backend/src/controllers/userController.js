const CryptoJS = require("crypto-js");
const Address = require("../models/Address");
const Review = require("../models/Review");
const User = require("../models/User");

// ! USE ONLY FOR TESTING replace "req.user.isAdmin" with testUserVerification
const testUserVerification = true;

const PASSWORD_SALT = CryptoJS.enc.Utf8.parse(
  process.env.PASSWORD_SALT || "juan"
);

const getUserHandler = async (req, res, next) => {
  try {
    const user = testUserVerification
      ? await User.findOne({ userName: req.params.userName })
      : req.user;
    const address = await Address.findOne({ userName: req.params.userName });

    let { password, __v, ...userDetails } = user._doc;

    // if (!address) res.status(200).json(userDetails);

    userDetails = { ...userDetails, address };
    if (testUserVerification) userDetails = { ...userDetails, password };

    res.status(200).json(userDetails);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserReviewsHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });
    const reviews = await Review.find({ userName: req.params.userName });

    console.log(reviews);
    res.status(200).json({ reviews });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// ? Implement sending limited entries for less bandwidth usage
// ? Filter by admin or customer
const getAllUsersHandler = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUserHandler = async (req, res, next) => {
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUserHandler = async (req, res, next) => {
  // !req.body.password && res.status(400).json({ msg: "Password not sent!" });

  // ! IMPLEMENT MECHANISHM TO CHECK PASSWORDS
  if (req.body.password) {
    req.body.password = CryptoJS.PBKDF2(req.body.password, PASSWORD_SALT, {
      keySize: 256 / 32,
    }).toString();
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { userName: req.params.userName },
      req.body
    );
    let { password, ...userDetails } = updatedUser.toObject();

    if (!req.body.address) {
      res.status(200).json(userDetails);
      return;
    }

    const address = await Address.findOneAndUpdate(
      { userName: req.params.userName },
      req.body.address
    );

    userDetails = { ...userDetails, address };
    res.status(200).json(userDetails);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUserHandler = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete(req.params.userName);
    await Address.findOneAndRemove({ userName: req.params.userName });
    res.status(200).json({ msg: "User has been deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const userController = {
  getUserHandler,
  getAllUsersHandler,
  getUserReviewsHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
module.exports = userController;
