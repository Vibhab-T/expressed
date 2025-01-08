const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', {
		docTitle: 'Add Product',
		path: 'addProduct',
	});
};

exports.postProductAndRedirect = (req, res, next) => {
	const product = new Product(
		req.body.productTitle,
		req.body.productPrice,
		req.body.productDescription
	);
	product.save();
	res.redirect('product-added');
};

exports.getProductAdded = (req, res, next) => {
	res.render('admin/product-added', {
		docTitle: 'Product Added',
		path: 'productAdded',
	});
};

exports.getShop = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('shop/index', {
			prods: products,
			docTitle: 'Shop',
			path: 'shop',
		});
	});
};

exports.getProductsList = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('shop/products-list', {
			prods: products,
			docTitle: 'Product Lists',
			path: 'productsList',
		});
	});
};

exports.getDetails = (req, res, next) => {
	const prodId = req.params.productId;
	Product.fetchById(prodId, (product) => {
		console.log(product);
	});
};

exports.getAdminProductsList = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('admin/products', {
			prods: products,
			docTitle: 'Admin Product Lists',
			path: 'adminProduct',
		});
	});
};
