const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: false },
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: [String], required: true },
    price: { type: [Number], required: true },
    discount: { type: Number, default: 0, required: true },
    special: { type: Boolean, required: false },
  },
  { timestamp: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
