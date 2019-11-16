const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
	const token = req.header('x-auth-token') || req.cookies.AuthToken;
	// user tried brute force stop him right here
	if (!token)
		return res
			.status(401)
			.send({ error: 'Acess denied. No token provided.' });
	try {
		const decoded = jwt.verify(token, process.env.jwtPrivateKey);
		//populate user details
		req.user = decoded;
		next();
	} catch (ex) {
		// give user another chance to login
		res.status(400).send({ error: 'Invalid token' });
	}
}

module.exports = auth;
