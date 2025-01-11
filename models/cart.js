const fs = require('fs');
const path = require('path');

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
};
