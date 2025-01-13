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
	product
		.save()
		.then(() => {
			res.redirect('product-added');
		})
		.catch((err) => console.log(err));
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
	Product.fetchById(prodId)
		.then(([product]) => {
			res.render('admin/edit-product', {
				docTitle: 'Edit Product',
				path: 'editProduct',
				product: product[0],
				editing: editMode,
			});
		})
		.catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
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
	res.redirect('/admin/products');
};

exports.getShop = (req, res, next) => {
	Product.fetchAll()
		.then(([rows, fieldData]) => {
			res.render('shop/index', {
				prods: rows,
				docTitle: 'Shop',
				path: 'shop',
			});
		})
		.catch((err) => console.log(err));
};

exports.getProductsList = (req, res, next) => {
	Product.fetchAll()
		.then(([rows, fieldData]) => {
			res.render('shop/products-list', {
				prods: rows,
				docTitle: 'Products List',
				path: 'productsList',
			});
		})
		.catch((err) => console.log(err));
};

exports.getDetails = (req, res, next) => {
	const prodId = req.params.productId;
	Product.fetchById(prodId)
		.then(([product]) => {
			res.render('shop/product-details', {
				docTitle: product.title,
				product: product[0],
				path: 'productDetails',
			});
		})
		.catch((err) => console.log(err));
};

exports.getAdminProductsList = (req, res, next) => {
	Product.fetchAll()
		.then(([rows]) => {
			res.render('admin/products', {
				prods: rows,
				docTitle: 'Admin Product Lists',
				path: 'adminProduct',
			});
		})
		.catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
	prodId = req.body.productId;
	Product.deleteById(prodId);
	res.redirect('/admin/products');
};
