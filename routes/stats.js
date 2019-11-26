const pool = require('../models/mysqldb');
const express = require('express');
const { User, validateUser } = require('../models/user');
const router = express.Router();
router.get('/', (req, res) => {
	let result_fin = [];
	pool.query(`SELECT COUNT(*) FROM animal`, (err, result) => {
		if (err) {
			return res.status(400).send({ error: err });
		}
		result_fin.push(result[0]['COUNT(*)']);
		pool.query(
			` SELECT count(DISTINCT animal.species) from animal;`,
			(err, result) => {
				if (err) {
					return res.status(400).send({ error: err });
				}

				result_fin.push(result[0]['count(DISTINCT animal.species)']);
				pool.query(
					`SELECT count(DISTINCT reports.reportername) from reports; `,
					async (err, result) => {
						if (err) {
							return res.status(400).send({ error: err });
						}
						result_fin.push(
							result[0]['count(DISTINCT reports.reportername)']
						);

						const users = await User.countDocuments();
						// console.log(users);
						result_fin.push(users);

						res.send(result_fin);
					}
				);
			}
		);
	});
});

module.exports = router;
