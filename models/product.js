const fs = require('fs');
const { get } = require('https');
const path = require('path');

const filePath = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'products.json'
);

const getProductsFromFile = (callback) => {
	fs.readFile(filePath, (err, fileContent) => {
		if (err) {
			callback([]);
		} else {
			callback(JSON.parse(fileContent));
		}
	});
};

module.exports = class Product {
	constructor(id, title, price, url, description) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.url = url;
		this.description = description;
	}

	save() {
		getProductsFromFile((products) => {
			if (this.id) {
				const existingProductIndex = products.findIndex(
					(prod) => prod.id === this.id
				);
				products[existingProductIndex] = this;
			} else {
				this.id = Math.random().toString();
				products.push(this);
			}
			fs.writeFile(filePath, JSON.stringify(products), (err) => {
				console.log(err);
			});
		});
	}

	static fetchAll(callback) {
		getProductsFromFile(callback);
	}

	static fetchById(id, callback) {
		getProductsFromFile((products) => {
			const product = products.find((prod) => prod.id === String(id));
			callback(product);
		});
	}

	static deleteProduct(id) {
		getProductsFromFile((products) => {
			const updatedProducts = products.filter((prod) => prod.id !== id);
			fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) =>
				console.log(err)
			);
		});
	}
};
