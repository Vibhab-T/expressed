exports.getErrorPage404 = (req, res, next) => {
	res.status(404).render('error-404', {
		docTitle: 'Error 404: Not Found',
		path: 'error404',
	});
};
