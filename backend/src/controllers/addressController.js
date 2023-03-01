const Address = require("../models/Address");

const getAddress = async (req, res, next) => {
  try {
    const address = await Address.findById(req.params.addressId);
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ userName: req.params.userName });
    res.status(200).json({ addresses });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createAddress = async (req, res, next) => {
  const newAddress = new Address(req.body);
  try {
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.addressId,
      req.body
    );
    res.status(200).json(updatedAddress);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(
      req.params.addressId
    );
    res.status(200).json("Address has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};

const addressController = {
  getAddress,
  getAllAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};

module.exports = addressController;
