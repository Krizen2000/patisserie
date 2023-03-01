const Coupon = require("../models/Coupon");

const createCoupon = async (req, res) => {
  const coupon = new Coupon(req.body);
  try {
    const savedCoupon = await coupon.save();
    res.status(201).json(savedCoupon);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllCoupon = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({ coupons });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ name: req.params.couponName });
    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCoupon = async (req, res) => {
  try {
    console.log(req.body);
    const updatedCoupon = await Coupon.findOneAndUpdate(
      { name: req.params.couponName },
      req.body
    );
    res.status(200).json(updatedCoupon);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCoupon = async (req, res) => {
  try {
    await Coupon.findOneAndRemove({ name: req.params.couponName });
    res.status(200).json({ msg: "Coupon has been deleted!" });
  } catch (err) {
    res.satus(500).json(err);
  }
};

const couponController = {
  createCoupon,
  getAllCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};
module.exports = couponController;
