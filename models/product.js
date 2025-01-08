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
		}
		callback(JSON.parse(fileContent));
	});
};

module.exports = class Product {
	constructor(title, price, description) {
		this.title = title;
		this.price = price;
		this.description = description;
	}

	save() {
		this.id = Math.random().toString();
		getProductsFromFile((products) => {
			products.push(this);
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
			const product = products.find((prod) => prod.id === id);
			callback(product);
		});
	}
};
