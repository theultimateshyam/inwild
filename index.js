const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const users = require('./routes/users');
const auth = require('./routes/auth');

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
		console.log(`Successfully connected to database `);
	});

app.use(express.static(__dirname + '/public'));

app.use(cors({ exposedHeaders: ['x-auth-token'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
	res.render('index');
});
app.use('/api/auth', auth);
app.use('/api/users', users);

const port = process.env.port || 3000;
app.listen(port, () => {
	console.log('Listening on port ' + port);
});
