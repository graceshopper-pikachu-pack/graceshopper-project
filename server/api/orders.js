const router = require("express").Router();
const {
  models: { Order, OrderItem, User, Product },
} = require("../db");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT;
module.exports = router;

const authRequired = async (req, res, next) => {
  // Grabs token from cookies
  const token = req.headers.authorization;
  // jwt verify throws an exception when the token isn't valid
  try {
    const { id, adminStatus } = await jwt.verify(token, secret);
    req.userId = id;
    req.adminStatus = adminStatus;
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "Unauthorized",
    });
    return;
  }
  next();
};

// GET api/orders (all orders with products associated with a user)
router.get("/", authRequired, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: OrderItem,
          include: { model: Product },
        },
      ],
    });

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

// POST /api/orders (create a new order)
router.post("/", authRequired, async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      userId: req.userId,
      status: "pending",
    });

    if (newOrder.id) {
      req.body.forEach(async (order) => {
        let orderItem = await OrderItem.create({
          orderId: newOrder.id,
          price: order.price,
          quantity: order.quantity,
          productId: order.id,
        });

        newOrder.totalPrice += orderItem.price;
        await newOrder.save();
      });

      res.status(200).json(newOrder);
    }
  } catch (err) {
    next(err);
  }
});


