function openForm1() {
	document.getElementById('right-container1').style.display = 'none';
	document.getElementById('right-container2').style.display = 'flex';
}

function openForm2() {
	document.getElementById('right-container2').style.display = 'none';
	document.getElementById('right-container3').style.display = 'flex';
}

function openForm3() {
	document.getElementById('right-container3').style.display = 'none';
	document.getElementById('right-container2').style.display = 'flex';
}

function closeForm1() {
	document.getElementById('right-container2').style.display = 'none';
	document.getElementById('right-container1').style.display = 'flex';
}

function closeForm2() {
	document.getElementById('right-container3').style.display = 'none';
	document.getElementById('right-container1').style.display = 'flex';
}
