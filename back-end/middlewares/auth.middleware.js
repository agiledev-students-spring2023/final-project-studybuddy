const isAuthenticated = (req, res, next) => {
	// TODO: implement authentication after basic routes are done
	next();
};

module.exports = { isAuthenticated };
