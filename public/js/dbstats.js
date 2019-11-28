async function getdata() {
	await axios
		.get('/stats', {})
		.then(response => {
			console.log(response);
			var arr = response.data;
			animateValue("num_animal", 100, arr[0], 5000);
			animateValue("num_animalcat", 100, arr[1], 5000);
			animateValue("num_reporters", 100, arr[2], 5000);
			animateValue("num_users", 100, arr[3], 5000);
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
    var increment = end > start? 1 : -1;
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

