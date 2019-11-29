function checkloguser() {
	if (sessionStorage.getItem('status') != null) {
		const welcome = document.getElementById('welcome');
		const signout = document.getElementById('signout');
		const login = document.getElementById('login');
		let x = document.cookie;
		x = x.replace('username=', '');
		welcome.innerHTML = `Welcome, ${x}`;
		login.style.display = 'none';
		signout.style.display = 'block';
		// login.style.display = 'hidden';
	}
	if (sessionStorage.getItem('secondtime') != null) {
		document.getElementById('right-container1').style.display = 'none';
		document.getElementById('right-container3').style.display = 'none';
		document.getElementById('right-container2').style.display = 'flex';
	}
}

function signout() {
	sessionStorage.clear();
	window.alert('Signed out');
}

function performSigin() {
	if (sessionStorage.getItem('status') != null) {
		window.alert('Already signed in');
		sessionStorage.setItem('secondtime', 'Yes');
		window.location.href = '/index.html';
	} else {
		//show validation message
		const password = document.getElementById('sipassword').value;
		const email = document.getElementById('siemail').value;
		const restext = document.getElementById('response-si-message');
		const welcome = document.getElementById('welcome');
		const login = document.getElementById('login');
		const signout = document.getElementById('signout');
		axios
			.post('http://localhost:3000/auth', {
				password: password,
				email: email
			})
			.then(response => {
				// console.log(response);
				window.alert = 'Sigin Successfull';
				sessionStorage.setItem('status', 'loggedIn');
				let x = document.cookie;
				x = x.replace('username=', '');
				welcome.innerHTML = `Welcome, ${x}`;
				restext.style.color = 'green';
				login.style.display = 'none';
				signout.style.display = 'block';
				sessionStorage.setItem('secondtime', 'Yes');
				window.location.href = 'index.html';
			})
			.catch(error => {
				console.log(error.response.data['error']);
				console.log(error.response);
				let supstr = JSON.stringify(error.response.data);
				supstr = supstr.replace(/[^ a-zA-Z0-9]/g, '');
				supstr = supstr.replace('error', '');

				restext.innerHTML = supstr;
			});
	}
}

function performSigup() {
	const name = document.getElementById('su-name').value;
	// const username = document.getElementById('su-username').value;
	const password = document.getElementById('su-password').value;
	const email = document.getElementById('su-email').value;
	const restext = document.getElementById('response-su-message');
	const welcome = document.getElementById('welcome');
	const login = document.getElementById('login');
	const signout = document.getElementById('signout');
	axios
		.post('http://localhost:3000/users', {
			name: name,
			password: password,
			// username: username,
			designation: 'explorer',
			email: email
		})
		.then(response => {
			sessionStorage.setItem('secondtime', 'Yes');
			console.log(response);
			window.alert('SigUp Successfull');
			sessionStorage.setItem('status', 'loggedIn');
			let x = document.cookie;
			x = x.replace('username=', '');
			welcome.innerHTML = `Welcome, ${x}`;
			restext.style.color = 'green';
			login.style.display = 'none';
			signout.style.display = 'block';
			window.location.href = 'index.html';
		})
		.catch(err => {
			console.log(err.response);
			let supstr = JSON.stringify(err.response.data);
			supstr = supstr.replace(/[^ a-zA-Z0-9]/g, '');
			supstr = supstr.replace('error', '');
			restext.innerHTML = supstr;
		});
}
