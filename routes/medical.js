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
	var medicalinput = `insert into medical (AnimalID,Diseases,Treatment,healthdesc) values ('${req.body.animalid}' , '${req.body.diseases}','${req.body.treatment}','${req.body.description}')`;
	console.log(medicalinput);
	pool.query(medicalinput, (err, result) => {
		if (err) {
			return res.status(400).send({ error: err });
		}
		res.send().status(200);
	});
});

// ,
module.exports = router;
