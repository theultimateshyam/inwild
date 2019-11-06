const pool = require('../models/mysqldb');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// TEMPLATE FOR QUERY
// router.get('/path', auth, (req, res) => {
// 	pool.query('WRITE QUERY HERE', (err, result) => {
// 		if (err) {
// 	return res.status(400).send({ error: err });
// }
// res.send(result);
// 	});
// });

router.get('/', auth, (req, res) => {
	pool.query('SELECT * FROM reports', (err, result) => {
		if (err) {
			return res.status(400).send({ error: err });
		}
		res.send(result);
	});
});

module.exports = router;
