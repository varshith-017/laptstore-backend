const router = require("express").Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to load products" });
  }
});

router.get("/search/:key", async (req, res) => {
  try {
    const data = await Product.find({
      name: { $regex: req.params.key, $options: "i" }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to load product" });
  }
});

router.get("/search/:key", async (req, res) => {
  const data = await Product.find({
    name: { $regex: req.params.key, $options: "i" }
  });

  res.json(data);
});

module.exports = router;