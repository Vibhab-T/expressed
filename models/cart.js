const fs = require('fs');
const path = require('path');
const { isNull } = require('util');

const filePath = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'cart.json'
);

module.exports = class Cart {
	static addProduct(prodId, price) {
		fs.readFile(filePath, (err, fileContent) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(fileContent);
			}
			if (!cart.products) {
				cart = { products: [], totalPrice: 0 };
			}
			const existingProductIndex = cart.products.findIndex(
				(prod) => prod.id === prodId
			);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;
			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.qty++;
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id: prodId, qty: 1 };
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice += +price;
			fs.writeFile(filePath, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}

	static deleteProduct(prodId, price) {
		fs.readFile(filePath, (err, fileContent) => {
			if (err) {
				return;
			}
			const cart = JSON.parse(fileContent);
			const updatedCart = { ...cart };
			const product = updatedCart.products.find((prod) => prod.id === prodId);
			const productQty = product.qty;
			updatedCart.products = updatedCart.products.filter(
				(prod) => prod.id !== prodId
			);
			updatedCart.totalPrice -= price * productQty;
			fs.writeFile(filePath, JSON.stringify(updatedCart), (err) =>
				console.log(err)
			);
		});
	}

	static getCart(callback) {
		fs.readFile(filePath, (err, fileContent) => {
			const cart = JSON.parse(fileContent);
			if (err) {
				callback(null);
			} else {
				callback(cart);
			}
		});
	}
};
