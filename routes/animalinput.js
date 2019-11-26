const pool = require('../models/mysqldb');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const officerauth = require('../middleware/officerauth');
const Joi = require('@hapi/joi');
const cookies = require('cookie-parser');
const { User, validateUser } = require('../models/user');
const jwt = require('jsonwebtoken');

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
		pool.query(animalattributes, async (err, result) => {
			if (err) {
				return res.status(400).send({ error: err });
			}

			let ts = Date.now();

			let date_ob = new Date(ts);
			let date = date_ob.getDate();
			let month = date_ob.getMonth() + 1;
			let year = date_ob.getFullYear();

			// prints date & time in YYYY-MM-DD format
			let dmy = (year + "-" + month + "-" + date);


			const token = req.header('x-auth-token') || req.cookies.AuthToken;

			const user = jwt.verify(token, process.env.jwtPrivateKey);
			let username = await User.findOne({ _id: user }, 'username');
			var reportquery = `insert into reports (reportername,reporterid,reportdate,animalid)  values ('${username['username']}','${username['_id']}','${dmy}','${req.body.animalid}');`;
			pool.query(reportquery, (err, result) => {
				if (err) {
					return res.status(400).send({ error: err });
				}
				res.send();
			});
			
					
		});
	});
});


function validateanimalform(animal) {
	const schema = Joi.object({
		animalid:Joi.number().required(),
		animalname: Joi.string().required(),
		genus: Joi.string().required(),
		species: Joi.string().required(),
		color: Joi.string().required(),
		sex: Joi.string()
			.max(10)
			.required(),

		weight: Joi.number().required(),
		height: Joi.number().required(),
		lengthh: Joi.number().required(),
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
