exports.getCart = (req, res, next) => {
	res.render('shop/cart', { docTitle: 'Cart', path: 'cart' });
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', { docTitle: 'Checkout', path: 'checkout' });
};

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', { docTitle: 'Orders', path: 'orders' });
};
