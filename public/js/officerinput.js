function promoteuser() {
	const email = document.getElementById('email1').value;
	const message1 = document.getElementById('message1');
	axios
		.post('http://localhost:3000/officercreate', {
			email: email
		})
		.then(response => {
			console.log(response);
			message1.innerHTML = 'Promoted User';
		})
		.catch(err => {
			console.log(err.response);
			let supstr = JSON.stringify(err.response.data);
			supstr = supstr.replace(/[^ a-zA-Z0-9]/g, '');
			supstr = supstr.replace('error', '');

			message1.innerHTML = supstr;
		});
}

function deleteuser() {
	const email = document.getElementById('email2').value;
	const message2 = document.getElementById('message2');
	axios
		.post('http://localhost:3000/officerdelete', {
			email: email
		})
		.then(response => {
			console.log(response);
			message2.innerHTML = 'User removed from Database';
		})
		.catch(err => {
			console.log(err.response);
			let supstr = JSON.stringify(err.response.data);
			supstr = supstr.replace(/[^ a-zA-Z0-9]/g, '');
			supstr = supstr.replace('error', '');

			message2.innerHTML = supstr;
		});
}
