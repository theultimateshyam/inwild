const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const users = require('./routes/users');
const auth = require('./routes/auth');
const reports = require('./routes/reports');

require('dotenv').config();

const app = express();

mongoose
	.connect(process.env.mongoDbURI, {
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		// listen only if connected to mongoDb
		app.listen(port, () => {
			console.log('Listening on port ' + port);
			console.log('Connected to MongoDb');
		});
	});

app.use(express.static(__dirname + '/public'));

app.use(cors({ exposedHeaders: ['x-auth-token'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
	res.render('index');
});
app.use('/auth', auth);
app.use('/users', users);
app.use('/reports', reports);

const port = process.env.port || 3000;
