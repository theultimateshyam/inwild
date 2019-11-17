const jwt = require('jsonwebtoken');
const { User, validateUser } = require('../models/user');

async function officerAuth(req, res, next) {
	try {
		const token = req.header('x-auth-token') || req.cookies.AuthToken;

		const decoded = jwt.verify(token, process.env.jwtPrivateKey);
		//populate user details

		let userdesgn = await User.findOne({ _id: decoded }, 'designation');
		if (!userdesgn)
			return res
				.status(401)
				.send({ error: 'Acess denied, No user found' });

		userdesgn = userdesgn['designation'];

		if (userdesgn != 'officer')
			return res
				.status(401)
				.send({ error: 'Acess denied, Not an Officer' });

		next();
	} catch (ex) {
		// give user another chance to login
		res.status(400).send(ex);
	}
}

module.exports = officerAuth;
