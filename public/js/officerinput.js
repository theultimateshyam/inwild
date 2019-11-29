function login() {
	sessionStorage.setItem('secondtime', 'Yes');
	window.location.href = 'index.html';
	return false;
}

function signout() {
	sessionStorage.clear();
	window.alert('Signed out');
	window.location.href = 'index.html';
}

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
}

function signout() {
	sessionStorage.clear();
	window.alert('Signed out');
}

function promoteuser() {
	if (sessionStorage.getItem('status') == null) {
		window.alert('You have to be signed-in inorder to access this page');
		sessionStorage.setItem('secondtime', 'Yes');
		window.location.href = 'index.html';
		return false;
	} else {
		const email = document.getElementById('email1').value;
		const message1 = document.getElementById('message1');
		axios
			.post('http://localhost:3000/officercreate', {
				email: email
			})
			.then(response => {
				console.log(response);
				message1.innerHTML = 'Promoted User';
				message1.style.color = 'green';
			})
			.catch(err => {
				console.log(err.response);
				let supstr = JSON.stringify(err.response.data);
				supstr = supstr.replace(/[^ a-zA-Z0-9]/g, '');
				supstr = supstr.replace('error', '');

				message1.innerHTML = supstr;
			});
	}
}

function deleteuser() {
	if (sessionStorage.getItem('status') == null) {
		window.alert('You have to be signed-in inorder to access this page');
		sessionStorage.setItem('secondtime', 'Yes');
		window.location.href = 'index.html';
		return false;
	} else {
		const email = document.getElementById('email2').value;
		const message2 = document.getElementById('message2');
		axios
			.post('http://localhost:3000/officerdelete', {
				email: email
			})
			.then(response => {
				console.log(response);
				message2.innerHTML = 'User removed from Database';
				message2.style.color = 'green';
			})
			.catch(err => {
				console.log(err.response);
				let supstr = JSON.stringify(err.response.data);
				supstr = supstr.replace(/[^ a-zA-Z0-9]/g, '');
				supstr = supstr.replace('error', '');

				message2.innerHTML = supstr;
			});
	}
}
