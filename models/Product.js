const mongoose = require("mongoose");

module.exports = mongoose.model("Product", {
  name: String,
  brand: String,
  price: Number,
  image: String,
  features: String
});

