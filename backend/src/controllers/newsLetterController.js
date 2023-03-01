const NewsLetterClient = require("../models/NewsLetterClient");

const createNewsLetterClient = async (req, res, next) => {
  console.log("NewsLetterClient: ", req.body);
  const newNewsLetterClient = new NewsLetterClient(req.body);
  try {
    const savedNewsLetterClient = await newNewsLetterClient.save();
    res.status(201).json(savedNewsLetterClient);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllNewsLetterClient = async (req, res, next) => {
  try {
    const clients = await NewsLetterClient.find();
    res.status(200).json({ clients });
  } catch (err) {
    res.status(200).json(err);
  }
};

const deleteNewsLetterClient = async (req, res, next) => {
  try {
    await NewsLetterClient.findOneAndDelete({ name: req.params.email });
    res.status(200).json("Client is unsubscribed form the Newsletter");
  } catch (err) {
    res.status(500).json(err);
  }
};

const newsLetterController = {
  createNewsLetterClient,
  getAllNewsLetterClient,
  deleteNewsLetterClient,
};
module.exports = newsLetterController;
