const router = require('express').Router();
const { User, validateUser } = require('../models/user');
const auth = require('../middleware/auth');
const adminauth = require('../middleware/adminauth');

router.post('/', [auth, adminauth], async (req, res) => {
	try {
		let found = await User.findOne({ email: req.body.email });
		if (!found) return res.status(400).send('User not found');
		console.log(req.body.email);
		await User.deleteOne({ email: req.body.email });
		console.log('Deleted User');

		return res.status(200).send();
	} catch (err) {
		console.log(err);
		return res.status(400).send({ error: err.details[0].message });
	}
});

module.exports = router;
