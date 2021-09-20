const router = require('express').Router();
const { models: Product } = require('../db');
module.exports = router;

// GET /api/products/ (gets all products)
router.get('/', async (req, res, next) => {
  try {
    const products = Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

//GET /api/products/:id (gets single product by id)
router.get('/:id', async (req, res, next) => {
  try {
    const product = Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send(product);
    }
  } catch (err) {
    next(err);
  }
});

//POST /api/products (creates a new product)
router.post('/', async (req, res, next) => {
  try {
    let newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id (delete product)
router.delete('/:id', async (req, res, next) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id  (edit product by id)
router.put('/:id', async (req, res, next) => {
  try {
    let updatedProductInfo = await Product.findByPk(req.params.id);
    res.json(await updatedProductInfo.update(req.body));
  } catch (err) {
    next(err);
  }
});
