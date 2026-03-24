const router = require("express").Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// PLACE ORDER
router.post("/place", async (req, res) => {
  const { userId } = req.body;

  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart empty" });
  }

  const order = new Order({
    userId,
    items: cart.items.map(i => ({
      name: i.productId.name,
      price: i.productId.price,
      image: i.productId.image,
      quantity: i.quantity
    })),
    total: cart.items.reduce(
      (sum, i) => sum + i.productId.price * i.quantity,
      0
    )
  });

  await order.save();

  cart.items = [];
  await cart.save();

  res.json(order);
});

// GET ORDERS
router.get("/:userId", async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

module.exports = router;