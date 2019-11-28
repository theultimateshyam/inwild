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
function performmedicalinput() {
	if (sessionStorage.getItem('status') == null) {
		window.alert('You have to be signed-in inorder to access this page');
		sessionStorage.setItem('secondtime', 'Yes');
		window.location.href = 'index.html';
		return false;
	} else {
		const message = document.getElementById('message');
		const animalid = document.getElementById('animalid').value;
		const diseases = document.getElementById('diseases').value;
		const treatment = document.getElementById('treatment').value;
		const description = document.getElementById('description').value;
		axios
			.post('http://localhost:3000/medical', {
				animalid: animalid,
				diseases: diseases,
				treatment: treatment,
				description: description
			})
			.then(response => {
				console.log(response);
				message.innerHTML = 'Successfully Recorded';
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
