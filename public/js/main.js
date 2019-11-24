async function performSigin() {
	const password = document.getElementById('sipassword').value;
	const email = document.getElementById('siemail').value;
	const restext = document.getElementById('response-si-message');
	axios
		.post('http://localhost:3000/auth', {
			password: password,
			email: email
		})
		.then(response => {
			console.log(response);
			restext.innerHTML = 'Sigin Successfull';
		})
		.catch(error => {
			console.log(error.response);
			restext.innerHTML = JSON.stringify(error.response.data);
		});
}

async function performSigup() {
	const name = document.getElementById('su-name').value;
	const username = document.getElementById('su-username').value;
	const password = document.getElementById('su-password').value;
	const email = document.getElementById('su-email').value;
	const designation = document.getElementById('su-designation').value;
	const restext = document.getElementById('response-su-message');
	axios
		.post('http://localhost:3000/users', {
			name: name,
			password: password,
			username: username,
			designation: designation,
			email: email
		})
		.then(response => {
			console.log(response);
			restext.innerHTML = 'SigUP Successfull';
		})
		.catch(error => {
			console.log(error.response);
			restext.innerHTML = JSON.stringify(error.response.data);
		});
}
