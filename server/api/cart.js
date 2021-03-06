const router = require("express").Router();
const {
  models: { Cart, CartItem, Product },
} = require("../db");
module.exports = router;
const jwt = require("jsonwebtoken");

const secret = process.env.JWT;

const authRequired = async (req, res, next) => {
  // Grabs the token from the cookies
  const token = req.headers.authorization;
  // jwt verify throws an exception when the token isn't valid
  try {
    const { id } = await jwt.verify(token, secret);
    req.userId = id;
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "Unauthorized",
    });
    return;
  }
  next();
};

// GET /api/cart/id (gets cart Id)
router.get("/id", authRequired, async (req, res, next) => {
  try {
    // find cart associated with user
    const cart = await Cart.findOne({
      where: {
        userId: req.userId,
      },
    });
    if (cart) {
      // send back cartId
      res.status(200).json(cart);
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart/id (delete cart by cart Id)
router.delete("/id", authRequired, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: CartItem,
        },
      ],
    });

    if (cart.id) {
      cart.cartItems.forEach(async (item) => await item.destroy());

      res.status(200).json(cart);
    }
  } catch (err) {
    next(err);
  }
});

// GET /api/cart/cartItems (cartItems assoicated with a user)
router.get("/cartItems", authRequired, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: CartItem,
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

// GET /api/cart/cartItem (a single order w/products assoicated with a user)
router.get("/cartItem", authRequired, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.userId,
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

// POST api/cart/:cartId  (add cart item with productId to cartId)
router.post("/:cartId", authRequired, async (req, res, next) => {
  try {
    const cartItem = await CartItem.create({
      cartId: req.params.cartId,
      productId: req.body.productId,
      quantity: req.body.quantity,
    });

    res.status(200).json(cartItem);
  } catch (error) {
    next(err);
  }
});

// GET /api/cartItem/get/:id (gets cartItem by id)
router.get("/cartItem/get/:id", authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const cartItem = await CartItem.findOne(req.params.id);
      res.status(200).json(cartItem);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/cartItem/edit/:id (update cartItem by id)
router.put("/cartItem/edit/:id", authRequired, async (req, res, next) => {
  try {
    const updatedCartItem = await CartItem.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    res.status(200).json(updatedCartItem);
  } catch (err) {
    next(err);
  }
});

// PUT /api/cartItem/increment/:id (add to cartItem by id)
router.put("/cartItem/increment/:id", authRequired, async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);

    if (req.body.stockQuantity >= cartItem.quantity + 1) {
      const incrementedCart = await cartItem.increment("quantity", {
        by: 1,
        returning: true,
      });

      res.status(200).json(incrementedCart);
    } else {
      res.status(400).json({ message: "Quantity exceeds stock quantity" });
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/cartItem/increment/:id (add to cartItem by id)
router.put(
  "/cartItem/incrementBy/:id",
  authRequired,
  async (req, res, next) => {
    try {
      const cartItem = await CartItem.findByPk(req.params.id);
      // ensures stock quantity is not exceeded

      const incrementedCart = await cartItem.increment("quantity", {
        by: req.body.quantity,
        returning: true,
      });

      res.status(200).json(incrementedCart);
    } catch (err) {
      next(err);
    }
  }
);

// PUT /api/cartItem/decrement/:id (add to cartItem by id)
router.put("/cartItem/decrement/:id", authRequired, async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);

    if (cartItem.quantity - 1 >= 0) {
      const decrementedCart = await cartItem.decrement("quantity", {
        by: 1,
        returning: true,
      });

      res.status(200).json(decrementedCart);
    } else {
      res.status(400).json({ message: "Quantity must be a positive integer" });
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cartItem/remove/:id (remove cartItem by id)
router.delete("/cartItem/delete/:id", authRequired, async (req, res, next) => {
  try {
    const deletedCartItem = await CartItem.findByPk(req.params.id);
    await deletedCartItem.destroy();

    res.status(200).json(deletedCartItem);
  } catch (err) {
    next(err);
  }
});
