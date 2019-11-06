const router = require('express').Router();
const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
router.get('/', auth, async (req, res) => {
	const users = await User.find();
	res.send(users);
});

router.post('/', async (req, res) => {
	const { error } = validateUser(req.body);

	if (error) return res.status(400).send({ error: error.details[0].message });

	let user = await User.findOne({ email: req.body.email });

	if (user) return res.status(400).send({ error: 'User already exists ' });

	const salt = await bcrypt.genSalt(10);
	const hashed_password = await bcrypt.hash(req.body.password, salt);

	const newuser = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashed_password,
		username: req.body.username,
		designation: req.body.designation
	});
	await newuser.save();

	const token = newuser.generateAuthToken();
	res.header('x-auth-token', token).send(
		_.pick(newuser, ['_id', 'isAdmin', 'name'])
	);
});

module.exports = router;
