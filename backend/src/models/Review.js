const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, required: false },
    message: { type: String, required: false },
    rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
    userName: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
