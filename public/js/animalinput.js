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
function performanimalinput() {
	const message = document.getElementById('message');
	const animalid = document.getElementById('animalid').value;
	const animalname = document.getElementById('animalname').value;
	const genus = document.getElementById('genus').value;
	const species = document.getElementById('species').value;
	const weight = document.getElementById('weight').value;
	const height = document.getElementById('height').value;
	const length = document.getElementById('length').value;
	const color = document.getElementById('color').value;
	const age = document.getElementById('age').value;
	const sex = document.getElementById('sex').value;
	const limbcount = document.getElementById('limbcount').value;

	if (sessionStorage.getItem('status') == null) {
		window.alert('You have to be signed-in inorder to access this page');
		sessionStorage.setItem('secondtime', 'Yes');
		window.location.href = 'index.html';
		return false;
	} else {
		axios
			.post('http://localhost:3000/animalinput', {
				animalid: animalid,
				animalname: animalname,
				genus: genus,
				species: species,
				weight: weight,
				height: height,
				lengthh: length,
				color: color,
				age: age,
				sex: sex,
				limbcount: limbcount
			})
			.then(response => {
				console.log(response);
				message.innerHTML = 'Successfully Recorded';
				message.style.color = 'green';
			})
			.catch(err => {
				console.log(err.response);
				let supstr;
				if (err.response.data['error']['sqlMessage']) {
					supstr = JSON.stringify(
						err.response.data['error']['sqlMessage']
					);
					supstr = supstr.replace(/[^ a-zA-Z0-9]/g, '');
					supstr = supstr.replace('error', '');
				} else {
					supstr = JSON.stringify(err.response.data['error']);
					supstr = supstr.replace(/[^ a-zA-Z0-9]/g, '');
					supstr = supstr.replace('error', '');
				}

				message.innerHTML = supstr;
			});
	}
}
