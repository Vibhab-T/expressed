const express = require('express');

const productsController = require('../controllers/products');
const userActionController = require('../controllers/userAction');

const router = express.Router();

const adminData = require('../controllers/products');

router.get('/', productsController.getShop);

router.get('/products', productsController.getProductsList);

router.get('/product-details/:productId', productsController.getDetails);

router.get('/cart', userActionController.getCart);

router.get('/checkout', userActionController.getCheckout);

router.get('/orders', userActionController.getOrders);

module.exports = router;
