const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// ADD TO CART
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const item = cart.items.find(
    i => i.productId.toString() === productId
  );

  if (item) item.quantity++;
  else cart.items.push({ productId, quantity: 1 });

  await cart.save();
  res.json(cart);
});

// GET CART
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId })
    .populate("items.productId");

  res.json(cart || { items: [] });
});

// REMOVE ITEM
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });

  cart.items = cart.items.filter(
    i => i.productId.toString() !== productId
  );

  await cart.save();
  res.json(cart);
});

module.exports = router;