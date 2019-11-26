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
		})
		.catch(err => {
			console.log(err.response);
			let supstr = JSON.stringify(err.response.data);
			supstr = supstr.replace(/[^ a-zA-Z0-9]/g, '');
			supstr = supstr.replace('error', '');

			message.innerHTML = supstr;
		});
}
