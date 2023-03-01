const Product = require("../models/Product");
const Review = require("../models/Review");

// ? Considering changing to productName

const getProductHandler = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      id: req.params.productId,
    });
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).json({
      ...product.toObject(),
      reviews: reviews,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProductCategoryHandler = async (req, res, next) => {
  try {
    const products = await Product.find({ category: req.params.categoryName });
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json(err);
  }
};

// ? Implement sending limited entries for less bandwidth usage
const getAllProductsHandler = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSpecialProductsHandler = async (req, res, next) => {
  try {
    const products = await Product.find({ special: true })
      .sort({ updatedAt: "descending" })
      .limit(3);
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createProductHandler = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProductHandler = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.productId },
      req.body
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteProductHandler = async (req, res, next) => {
  try {
    await Product.findOneAndRemove({ id: req.params.productId });
    res.status(200).json({ msg: "Product has been deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const productContoller = {
  getProductHandler,
  getAllProductsHandler,
  getSpecialProductsHandler,
  getProductCategoryHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
module.exports = productContoller;
