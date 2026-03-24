const router = require("express").Router();
const User = require("../models/User");

// ADD
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;

  const user = await User.findById(userId);

  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
  }

  await user.save();
  res.json(user.wishlist);
});

// GET
router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.json(user.wishlist || []);
});

// REMOVE
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  const user = await User.findById(userId);
  user.wishlist = user.wishlist.filter(id => id !== productId);

  await user.save();

  res.json(user.wishlist);
});

module.exports = router;