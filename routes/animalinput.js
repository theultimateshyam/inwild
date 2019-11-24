const pool = require('../models/mysqldb');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const officerauth = require('../middleware/officerauth');
const Joi = require('@hapi/joi');

// const officerauth = require('../middleware/officerauth');
// [auth, officerauth]
router.post('/', [auth, officerauth], (req, res) => {
	const { error } = validateanimalform(req.body);

	if (error) return res.status(400).send({ error: error.details[0].message });

	var animalinputquery = `insert into animal (AnimalID,Name,Species,Genus) values ('${req.body.animalid}' , '${req.body.animalname}','${req.body.species}','${req.body.genus}')`;
	// console.log(animalinputquery)
	pool.query(animalinputquery, (err, result) => {
		if (err) {
			return res.status(400).send({ error: err });
		}

		var animalattributes = `insert into attributes (AnimalID,Height,Weight,Length,Age,Sex,Color,Limbcount) values ('${req.body.animalid}',${req.body.height},${req.body.weight},${req.body.lengthh},${req.body.age},'${req.body.sex}','${req.body.color}',${req.body.limbcount})`;
		pool.query(animalattributes, (err, result) => {
			if (err) {
				return res.status(400).send({ error: err });
			}

			res.send();
		});
	});
});

function validateanimalform(animal) {
	const schema = Joi.object({
		animalname: Joi.string().required(),
		genus: Joi.string().required(),
		species: Joi.string().required(),
		color: Joi.string().required(),
		sex: Joi.string()
			.max(10)
			.required(),

		weight: Joi.number().required(),
		height: Joi.number().required(),
		length: Joi.number().required(),
		age: Joi.number()
			.integer()
			.min(0)
			.max(300)
			.required(),
		limbcount: Joi.number()
			.integer()
			.required()
	});
	return schema.validate(animal);
}

module.exports = router;
