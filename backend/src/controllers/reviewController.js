const Review = require("../models/Review");

const getAllReviewsHandler = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ reviews });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getReviewHandler = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getRecentReviewHandler = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .sort({ updatedAt: "descending" })
      .limit(5);
    res.status(200).json({ reviews });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getReviewViaProductHandler = async (req, res, next) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).json({ reviews });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createReviewHandler = async (req, res, next) => {
  const review = new Review(req.body);
  try {
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateReviewHandler = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.reviewId,
      req.body
    );
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteReviewHandler = async (req, res, next) => {
  try {
    await Review.findByIdAndRemove(req.params.reviewId);
    res.status(200).json({ msg: "Review has been deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const reviewController = {
  getAllReviewsHandler,
  getReviewHandler,
  getRecentReviewHandler,
  getReviewViaProductHandler,
  createReviewHandler,
  updateReviewHandler,
  deleteReviewHandler,
};
module.exports = reviewController;
