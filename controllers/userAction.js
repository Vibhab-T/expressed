const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getCart = (req, res, next) => {
	Cart.getCart((cart) => {
		Product.fetchAll((products) => {
			const cartProducts = [];
			for (let product of products) {
				const inCart = cart.products.find((prod) => prod.id === product.id);
				if (inCart) {
					cartProducts.push({ productData: product, qty: inCart.qty });
				}
			}
			res.render('shop/cart', {
				docTitle: 'Cart',
				path: 'cart',
				products: cartProducts,
			});
		});
	});
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.fetchById(prodId, (product) => {
		Cart.addProduct(product.id, product.price);
	});
	res.redirect('/cart');
};

exports.postCartDeleteItem = (req, res, next) => {
	const prodId = req.body.productId;
	Product.fetchById(prodId, (product) => {
		Cart.deleteProduct(prodId, product.price);
		res.redirect('/cart');
	});
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', { docTitle: 'Checkout', path: 'checkout' });
};

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', { docTitle: 'Orders', path: 'orders' });
};
