const router = require("express").Router();
const {
  models: { Order, User, Product },
} = require("../db");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT;
module.exports = router;

const authRequired = async (req, res, next) => {
  // We grab the token from the cookies
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
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({ include: [User, Product] });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

// GET api/orders/:id  (a single order w/products assoicated with a user)
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [User, Product],
    });
    if (order) {
      res.status(200).json(order);
    }
  } catch (err) {
    next(err);
  }
});

// POST /api/orders (create a new order)
router.post("/", async (req, res, next) => {
  try {
    const newOrder = await Order.findOrCreate({
      where: { userId: req.body.userId, orderStatus: "pending" },
    });
    res.json(newOrder);
  } catch (err) {
    next(err);
  }
});

// PUT /api/orders/:id (update order by id)
router.put("/:id", async (req, res, next) => {
  try {
    let order = Order.update(
      req.body,
      {
        where: { id: req.params.id },
        returning: true,
      },
      { include: [User, Product] }
    );

    res.json(order[1]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/orders/:id (delete order by id)
router.delete("/:id", async (req, res, next) => {
  try {
    await Order.destroy(
      { where: { id: req.params.id } },
      { include: [User, Product] }
    );
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//GET /api/orders (all products associated with an order)
router.get("/:id/products", async (req, res, next) => {
  try {
    const orderwithProducts = await Order.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(orderwithProducts);
  } catch (err) {
    next(err);
  }
});
