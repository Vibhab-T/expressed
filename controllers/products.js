const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		docTitle: 'Add Product',
		path: 'addProduct',
		editing: false,
	});
};

exports.postProductAndRedirect = (req, res, next) => {
	const product = new Product(
		null,
		req.body.productTitle,
		req.body.productPrice,
		req.body.productUrl,
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

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		res.redirect('/');
	}
	prodId = req.params.productId;
	Product.fetchById(prodId, (product) => {
		res.render('admin/edit-product', {
			docTitle: 'Edit Product',
			path: 'editProduct',
			product: product,
			editing: editMode,
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.params.productId;
	const newTitle = req.body.productTitle;
	const newPrice = req.body.productPrice;
	const newUrl = req.body.productUrl;
	const newDescription = req.body.productDescription;
	const newProduct = new Product(
		prodId,
		newTitle,
		newPrice,
		newUrl,
		newDescription
	);
	newProduct.save();
	res.redirect('/');
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
		res.render('shop/product-details', {
			docTitle: product.title,
			product: product,
			path: 'productDetails',
		});
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
