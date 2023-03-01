const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
  },
  { timestamp: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
