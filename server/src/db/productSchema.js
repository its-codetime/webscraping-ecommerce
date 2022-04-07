const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: { type: String, index: true },
  link: String,
  price: Number,
  mrp: Number,
  ratings: String,
  image: String,
  ratingsCount: Number,
});

module.exports = mongoose.model("Product", productSchema);
