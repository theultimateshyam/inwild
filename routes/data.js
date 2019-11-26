const pool = require('../models/mysqldb');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');



router.post('/',  (req, res) => {
    // console.log(req.body);
	pool.query(`SELECT * FROM animal where Name = \"${req.body.animalname}\" `, (err, result) => {
		if (err) {
			return res.status(400).send({ error: err });
		}
		res.send(result);
	});
});

module.exports = router;
