const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
<<<<<<< HEAD
router.use('products', require('./products'));
=======
>>>>>>> 6cce750c19776b1f8805dbb91e9a0169cf55e2e7

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
