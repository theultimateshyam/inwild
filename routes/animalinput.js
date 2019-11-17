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

router.post('/', (req, res) => {
	var animalinputquery = `insert into animal (AnimalID,Name,Species,Genus) values ('${req.body.animalid}' , '${req.body.animalname}','${req.body.species}','${req.body.genus}')`;
	pool.query(animalinputquery, (err, result) => {
		if (err) {
			return res.status(400).send({ error: err });
		}

		var animalattributes = `insert into attributes (AnimalID,Height,Weight,Length,Age,Sex,Color,Limbcount) values ('${req.body.animalid}',${req.body.height},${req.body.weight},${req.body.length},${req.body.age},'${req.body.sex}','${req.body.color}',${req.body.limbcount})`;
		pool.query(animalattributes, (err, result) => {
			if (err) {
				return res.status(400).send({ error: err });
			}

			res.send();
		});
	});
});
// ,
module.exports = router;
