const Order = require("../models/Order");
const Product = require("../models/Product");

const getOrderHandler = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllOrdersForUserHandler = async (req, res, next) => {
  try {
    const orders = await Order.find({ userName: req.params.userName });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getRecentOrdersForUserHandler = async (req, res, next) => {
  try {
    const orders = await Order.find({ userName: req.params.userName })
      .sort({ createdAt: "descending" })
      .limit(3);
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllOrdersHandler = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createOrderHandler = async (req, res, next) => {
  console.log("Sent Data: ", req.body);

  req.body.items = await Promise.all(
    req.body.items.map(async (product) => {
      console.log(`Product in items:`, product);
      let fetchedProduct = await Product.findOne({ id: product.productId });
      console.log(`fetchedProduct:`, fetchedProduct);
      let priceIndex = fetchedProduct.size.indexOf(product.size);
      product["price"] = fetchedProduct.price.at(priceIndex);
      console.log("Price of Product", product["price"]);
      return product;
    })
  );
  console.log("Processed Data: ", req.body);

  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateOrderHandler = async (req, res, next) => {
  console.log("Sent Data: ", req.body);
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      req.body
    );
    res.status(201).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrderHandler = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.orderId);
    res.status(200).json({ msg: "Order has been deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const orderController = {
  getOrderHandler,
  getAllOrdersForUserHandler,
  getRecentOrdersForUserHandler,
  getAllOrdersHandler,
  updateOrderHandler,
  createOrderHandler,
  deleteOrderHandler,
};
module.exports = orderController;
