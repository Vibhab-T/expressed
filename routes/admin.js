const express = require('express');
const path = require('path');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/add-product', productsController.getAddProduct);

router.post('/addProduct', productsController.postProductAndRedirect);

router.get('/product-added', productsController.getProductAdded);

router.get('/products', productsController.getAdminProductsList);

router.get('/edit-product/:productId', productsController.getEditProduct);

router.post('/edit-product/:productId', productsController.postEditProduct);

module.exports = router;
