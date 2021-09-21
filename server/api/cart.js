const router = require("express").Router();
const {
  models: { Cart, CartItem, Product },
} = require("../db");
module.exports = router;

// GET api/cart/:userId  (a single order w/products assoicated with a user)
router.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
      },
      include: [
        {
          model: CartItem,
          include: { model: Product },
        },
      ],
    });
    if (cart) {
      res.status(200).json(cart);
    }
  } catch (err) {
    next(err);
  }
});
