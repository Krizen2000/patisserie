const mongoose = require("mongoose");

const NewsLetterClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const NewsLetterClient = mongoose.model(
  "NewsLetterClient",
  NewsLetterClientSchema
);
module.exports = NewsLetterClient;
