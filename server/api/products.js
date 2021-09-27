const router = require("express").Router();
const {
  models: { Product },
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

// GET /api/products (gets all products)
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      // order by name
      order: ["productName"],
    });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

//GET /api/products/:id (gets single product by id)
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send(product);
    }
  } catch (err) {
    next(err);
  }
});

//GET /api/products/:productName (gets single product by name)
router.get("/:productName", async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        name: req.params.productName,
      },
    });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

//POST /api/products (creates a new product)

router.post("/", authRequired, async (req, res, next) => {
  try {
    // only admins can create new products
    if (req.adminStatus) {
      let newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id (delete product)
router.delete("/:id", authRequired, async (req, res, next) => {
  try {
    if (req.adminStatus) {
      const deleteCount = await Product.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deleteCount);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id  (update product by id)
router.put("/:id", authRequired, async (req, res, next) => {
  try {
    // only admins can edit products
    if (req.adminStatus) {
      let updatedProductInfo = await Product.findByPk(req.params.id);
      res.json(await updatedProductInfo.update(req.body));
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id  (inc product amount by id)
router.put("/:id/increase", authRequired, async (req, res, next) => {
  try {
    // only admins can edit products
    if (req.adminStatus) {
      let product = Product.findByPk(req.params.id);
      product.stockQuantity++;
      res.json(await product.save());
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id  (dec product amount by id)
router.put("/:id/decrease", authRequired, async (req, res, next) => {
  try {
    // only admins can edit products
    if (req.adminStatus) {
      let product = Product.findByPk(req.params.id);
      product.stockQuantity--;
      res.json(await product.save());
    }
  } catch (err) {
    next(err);
  }
});
