const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const expressHbs = require("express-handlebars");

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const sequelize = require('./utility/database');

const app = express();

// app.engine("handlebars", expressHbs.engine()); //handlebars init
// app.set("view engine", "handlebars");

//app.set("view engine", "pug"); //pug init

app.set('view engine', 'ejs'); //ejs init
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(errorController.getErrorPage404);

sequelize
	.sync()
	.then((result) => {
		//console.log(result);
		console.log('server running on port 3000');
		app.listen(3000);
	})
	.catch((error) => {
		console.log(err);
	});
