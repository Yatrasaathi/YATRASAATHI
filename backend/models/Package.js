const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String },
  duration: { type: String }, // e.g. "3 days / 2 nights"
  price: { type: Number, required: true },
  imageUrl: { type: String }, // Optional, if you want to show an image
});

module.exports = mongoose.model("Package", packageSchema);
