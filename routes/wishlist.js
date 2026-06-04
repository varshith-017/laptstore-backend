const router = require("express").Router();
const User = require("../models/User");
const Product = require("../models/Product");

// ADD TO WISHLIST
router.post("/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.json({
      success: true,
      wishlist: user.wishlist
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET WISHLIST PRODUCTS
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const products = await Product.find({
      _id: { $in: user.wishlist }
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// REMOVE FROM WISHLIST
router.post("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );

    await user.save();

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
