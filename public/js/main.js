function performSigin() {
	const password = document.getElementById('sipassword').value;
	const email = document.getElementById('siemail').value;
	const restext = document.getElementById('response-si-message');
	const login = document.getElementById('login');
	axios
		.post('http://localhost:3000/auth', {
			password: password,
			email: email
		})
		.then(response => {
			// console.log(response);
			restext.innerHTML = 'Sigin Successfull';
			console.log(document.cookie);
			// restext.innerHTML = `Welcome, ${restext.cookie}`
			restext.style.color = 'green';
		})
		.catch(error => {
			console.log(error.response);
			let supstr = JSON.stringify(error.response.data);
			supstr = supstr.replace(/[^ a-zA-Z0-9]/g, '');
			supstr = supstr.replace('error', '');

			restext.innerHTML = supstr;
		});
}

function performSigup() {
	const name = document.getElementById('su-name').value;
	const username = document.getElementById('su-username').value;
	const password = document.getElementById('su-password').value;
	const email = document.getElementById('su-email').value;
	let designation = document.getElementById('su-designation').value;
	designation = designation.toLowerCase();
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
		.catch(err => {
			console.log(err.response);
			let supstr = JSON.stringify(err.response.data);
			supstr = supstr.replace(/[^ a-zA-Z0-9]/g, '');
			supstr = supstr.replace('error', '');

			restext.innerHTML = supstr;
		});
}
