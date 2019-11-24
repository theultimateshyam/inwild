const pool = require('../models/mysqldb');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Joi = require('@hapi/joi');
const officerauth = require('../middleware/officerauth');

router.post('/', [auth, officerauth], (req, res) => {
	const { error } = validatemedicalform(req.body);

	if (error) return res.status(400).send({ error: error.details[0].message });
	var medicalinput = `insert into medical (AnimalID,Diseases,Treatment,healthdesc) values ('${req.body.animalid}' , '${req.body.diseases}','${req.body.treatment}','${req.body.description}')`;

	pool.query(medicalinput, (err, result) => {
		if (err) {
			return res.status(400).send({ error: err });
		}
		res.send().status(200);
	});
});

function validatemedicalform(medical) {
	const schema = Joi.object({
		diseases: Joi.string().required(),
		treatment: Joi.string().required(),
		description: Joi.string().required()
	});
	return schema.validate(medical);
}

module.exports = router;
