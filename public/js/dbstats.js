async function getdata() {
	let endval = 50;
	let durationtime = 2000;
	await axios
		.get('/stats', {})
		.then(response => {
			console.log(response);
			var arr = response.data;
			animateValue('num_animal', endval, arr[0], durationtime);
			animateValue('num_animalcat', endval, arr[1], durationtime);
			animateValue('num_reporters', endval, arr[2], durationtime);
			animateValue('num_users', endval, arr[3], durationtime);
			// num_animal.innerText = arr[0];
			// num_animalcat.innerText = arr[1];
			// num_reporters.innerText = arr[2];
			// num_users.innerText = arr[3];
		})
		.catch(err => {
			console.log(err);
		});
}

function animateValue(id, start, end, duration) {
	var range = end - start;
	var current = start;
	var increment = end > start ? 1 : -1;
	var stepTime = Math.abs(Math.floor(duration / range));
	var obj = document.getElementById(id);
	var timer = setInterval(function() {
		current += increment;
		obj.innerText = current;
		if (current == end) {
			clearInterval(timer);
		}
	}, stepTime);
}
