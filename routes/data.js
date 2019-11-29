const pool = require('../models/mysqldb');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, (req, res) => {
	console.log(req.body.color.length);

	//resolve undefined

	if (req.body.sex.length == 0 && req.body.color.length == 0) {
		pool.query(
			`SELECT * FROM animal where Name = \"${req.body.animalname}\" `,
			(err, result) => {
				if (err) {
					return res.status(400).send({ error: err });
				}
				res.send(result);
			}
		);
	} else if (req.body.sex.length != 0 && req.body.color.length == 0) {
		//
		console.log(11);
		pool.query(
			` select animal.AnimalID,Name,Genus,Species,Weight,Age,Color,Height,Length,Sex,Limbcount from animal inner  join (attributes inner  join attribanimal on attribanimal.AttributeID = attributes.AttributeID) on animal.AnimalID = attribanimal.AnimalID where animal.Name = \"${req.body.animalname}\" and attributes.Sex = \"${req.body.sex}\" `,
			(err, result) => {
				if (err) {
					return res.status(400).send({ error: err });
				}
				// console.log(result);
				res.send(result);
			}
		);
	} else if (req.body.sex.length == 0 && req.body.color.length != 0) {
		console.log(req.body);
		console.log(122);
		pool.query(
			` select animal.AnimalID,Name,Genus,Species,Weight,Age,Color,Height,Length,Sex,Limbcount from animal inner  join (attributes inner  join attribanimal on attribanimal.AttributeID = attributes.AttributeID) on animal.AnimalID = attribanimal.AnimalID where animal.Name = \"${req.body.animalname}\" and attributes.Color = \"${req.body.color}\" `,
			(err, result) => {
				if (err) {
					return res.status(400).send({ error: err });
				}
				console.log(result);
				res.send(result);
			}
		);
	} else {
		// where animal.Name = \"${req.body.animalname}\" attribute.sex = \"${req.body.sex}\"

		pool.query(
			` select animal.AnimalID,Name,Genus,Species,Weight,Age,Color,Height,Length,Sex,Limbcount from animal inner  join (attributes inner  join attribanimal on attribanimal.AttributeID = attributes.AttributeID) on animal.AnimalID = attribanimal.AnimalID where animal.Name = \"${req.body.animalname}\" and attributes.Color = \"${req.body.color}\" and attributes.sex = \"${req.body.sex}\" `,
			(err, result) => {
				if (err) {
					return res.status(400).send({ error: err });
				}
				console.log(result);
				res.send(result);
			}
		);
	}
});

module.exports = router;
