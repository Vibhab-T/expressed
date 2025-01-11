const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getCart = (req, res, next) => {
	res.render('shop/cart', { docTitle: 'Cart', path: 'cart' });
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.fetchById(prodId, (product) => {
		Cart.addProduct(product.id, product.price);
	});
	res.redirect('/cart');
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', { docTitle: 'Checkout', path: 'checkout' });
};

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', { docTitle: 'Orders', path: 'orders' });
};
