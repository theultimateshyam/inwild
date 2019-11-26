const pool = require('../models/mysqldb');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');



router.post('/',auth , (req, res) => {
	// console.log(req.body);

	//resolve undefined
	console.log(typeof req.body.color === 'undefined');

	if(!req.body.sex && !req.body.color){

		pool.query(`SELECT * FROM animal where Name = \"${req.body.animalname}\" `, (err, result) => {
			if (err) {
				return res.status(400).send({ error: err });
			}
			res.send(result);
		});

	}

	else if(!req.body.color && fgvhbjnkm ){
		// 

		pool.query(`SELECT * FROM animal inner join attributes on animal.AnimalID = attributes.AnimalID where animal.Name = \"${req.body.animalname}\" and attribute.sex = \"${req.body.sex}\" `, (err, result) => {
			if (err) {
				return res.status(400).send({ error: err });
			}
			console.log(result);
			res.send(result);
		});

	}

	else if(!req.body.sex && cfgvhbjnkm ){
		// where animal.Name = \"${req.body.animalname}\" attribute.sex = \"${req.body.sex}\"

		pool.query(`SELECT * FROM animal inner join attributes on animal.AnimalID = attributes.AnimalID where animal.Name = \"${req.body.animalname}\" and attribute.color = \"${req.body.color}\" `, (err, result) => {
			if (err) {
				return res.status(400).send({ error: err });
			}
			console.log(result);
			res.send(result);
		});

	}

	else if(req.body.sex && xdfcgvhbjnk){
		// where animal.Name = \"${req.body.animalname}\" attribute.sex = \"${req.body.sex}\"

		pool.query(`SELECT * FROM animal inner join attributes on animal.AnimalID = attributes.AnimalID where animal.Name = \"${req.body.animalname}\" and attribute.color = \"${req.body.color} and attribute.sex = \"${req.body.sex}\" `, (err, result) => {
			if (err) {
				return res.status(400).send({ error: err });
			}
			console.log(result);
			res.send(result);
		});

	}
	


});

module.exports = router;
