const pool = require('../models/mysqldb');
const express = require('express');
const { User, validateUser } = require('../models/user');
const router = express.Router();
router.get('/', async(req, res) => {
        result_fin=[];
		pool.query(`SELECT COUNT(*) FROM animal`, (err1, result1) => {
			if (err1) {
				return res.status(400).send({ error: err });
			}
			result_fin.push(toString(result1))
		});
		pool.query(`SELECT COUNT(*) FROM (SELECT COUNT(*) AS Count FROM animal GROUP  BY animal.Name)`, (err2, result2) => {
			if (err2) {
				return res.status(400).send({ error: err });
            }
            result_fin.push(toString(result2))
		});
		pool.query(`SELECT COUNT(*) FROM (SELECT COUNT(*) AS Count FROM reports GROUP  BY reports.reportername) `, (err3, result3) => {
			if (err3) {
				return res.status(400).send({ error: err });
			}
			result_fin.push(toString(result3))
		});
        const users = await User.countDocuments();
        result_fin.push(toString(users));
        res.send(result_fin);
        pool.releaseConnection();
});

module.exports = router;