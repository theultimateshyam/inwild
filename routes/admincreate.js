const router = require('express').Router();
const { User, validateUser } = require('../models/user');
const auth = require('../middleware/auth');
const adminauth = require('../middleware/adminauth');

router.post('/', [auth, adminauth], async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(400).send('User not found');

		console.log(user);
		user.designation = 'officer';
		await user.save();
		res.send().status(200);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
