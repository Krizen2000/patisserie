const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    discount: { type: Number, required: true },
    maxCap: { type: Number, required: true },
    isValid: { type: Boolean, default: true, required: true },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", CouponSchema);
module.exports = Coupon;
