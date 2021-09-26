const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

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

router.post("/", async (req, res, next) => {
  try {
    let newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id (delete product)
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteCount = await Product.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(deleteCount);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id  (update product by id)
router.put("/:id", async (req, res, next) => {
  try {
    let updatedProductInfo = await Product.findByPk(req.params.id);
    res.json(await updatedProductInfo.update(req.body));
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id  (inc product amount by id)
router.put("/:id/increase", async (req, res, next) => {
  try {
    let product = Product.findByPk(req.params.id);
    product.stockQuantity++;
    res.json(await product.save());
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id  (dec product amount by id)
router.put("/:id/decrease", async (req, res, next) => {
  try {
    let product = Product.findByPk(req.params.id);
    product.stockQuantity--;
    res.json(await product.save());
  } catch (err) {
    next(err);
  }
});
