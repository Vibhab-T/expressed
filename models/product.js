const db = require('../utility/database');

const Cart = require('./cart');

module.exports = class Product {
	constructor(id, title, price, url, description) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.url = url;
		this.description = description;
	}

	save() {
		return db.execute(
			'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
			[this.title, this.price, this.description, this.url]
		);
	}

	static deleteById(id) {}

	static fetchAll() {
		return db.execute('SELECT * FROM products');
	}

	static fetchById(id) {
		return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
	}
};
