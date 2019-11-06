const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
router.use(express.json());
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
	const { error } = validateUser(req.body);

	if (error) return res.status(400).send({ error: error.details[0].message });

	let user = await User.findOne({ email: req.body.email });

	if (!user)
		return res.status(400).send({ error: 'Invalid User name or Password' });

	const validpassword = await bcrypt.compare(
		req.body.password,
		user.password
	);

	if (!validpassword)
		return res.status(400).send({ error: 'Invalid User name or Password' });

	res.send(jwt.sign({ _id: user._id }, process.env.jwtPrivateKey));
});

function validateUser(req) {
	const schema = Joi.object({
		email: Joi.string().email({ tlds: { allow: ['com', 'net', 'in'] } }),
		password: Joi.string()
	});

	return schema.validate(req);
}

module.exports = router;
