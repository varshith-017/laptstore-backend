const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  wishlist: [ { type: mongoose.Schema.Types.ObjectId, ref: "Product" } ]
});

module.exports = mongoose.model("User", userSchema);