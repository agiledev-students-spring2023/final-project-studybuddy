const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
	} catch (error) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	return next();
};

module.exports = { isAuthenticated };
