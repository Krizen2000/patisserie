const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    id: { type: String },
    userName: { type: String, required: true },
    street: { type: String },
    city: { type: String },
    pincode: { type: String },
    state: { type: String },
  },
  { timestamp: true }
);

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
