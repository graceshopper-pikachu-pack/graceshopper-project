const router = require("express").Router();
const {
  models: { Cart, CartItem, Product },
} = require("../db");
module.exports = router;
const jwt = require("jsonwebtoken");

const secret = process.env.JWT;

const authRequired = async (req, res, next) => {
  // We grab the token from the cookies
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
    // find the cart associated with the user
    const cart = await Cart.findOne({
      where: {
        userId: req.userId,
      },
    });
    if (cart) {
      // send back the cartId
      res.status(200).json(cart);
    }
  } catch (err) {
    next(err);
  }
});

// GET /api/cart/products (a single order w/products assoicated with a user)
router.get("/cartItems", authRequired, async (req, res, next) => {
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

// PUT /api/cartItem/edit/:id (update cartItem by id)
router.put("/cartItem/edit/:id", authRequired, async (req, res, next) => {
  try {
    console.log(req.body);
    const updatedCartItem = await CartItem.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    console.log(updatedCartItem);
    res.status(200).json(updatedCartItem);
  } catch (err) {
    next(err);
  }
});

// PUT /api/cartItem/edit/:id (add to cartItem by id)
router.put("/cartItem/add/:id", authRequired, async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);

    const incrementedCart = await cartItem.increment("quantity", {
      by: req.body.quantity,
    });

    res.status(200).json(incrementedCart);
  } catch (err) {
    next(err);
  }
});
