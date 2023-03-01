const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      state: { type: String, required: true },
    },
    items: [
      {
        productId: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    shippingCharge: { type: Number, required: true },
    coupon: {
      name: { type: String, required: false },
      discount: { type: Number, required: false },
      maxCap: { type: Number, required: false },
    },
    paymentMethod: {
      type: String,
      enum: ["Online", "Cash on delivery"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Preparing", "On the way", "Delivered"],
      default: "Preparing",
      required: true,
    },
    deliveredAt: { type: Date, required: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
