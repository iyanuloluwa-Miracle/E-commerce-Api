const express = require('express')
const router = express.Router();
const productController = require('../controller/productController')

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getProduct);

router.post('/products', productController.addProduct);

router.delete('/products/:id', productController.deleteProducts);

router.patch('/products/:id', productController.updateProducts);

module.exports = router;
