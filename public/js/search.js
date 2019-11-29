var myList;
var data = [];

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
async function getdata() {
	if (sessionStorage.getItem('status') == null) {
		window.alert('You have to be signed-in inorder to access this page');
		sessionStorage.setItem('secondtime', 'Yes');
		window.location.href = 'index.html';
		return false;
	} else {
		const animalname = document.getElementById('animalname').value;
		const color = document.getElementById('color').value;
		const sex = document.getElementById('sex').value;
		$('#table').empty();

		await axios
			.post('/data', {
				animalname: animalname,
				color: color,
				sex: sex
			})
			.then(response => {
				myList = response.data;
				if (!(Array.isArray(myList) && myList.length)) {
					window.alert('404, no results found');
				}
				// 	// console.log(myList);
				else {
					buildHtmlTable('#table');
				}
			})
			.catch(err => {
				console.log(err);
			});
	}
}
function buildHtmlTable(selector) {
	$(selector).empty();
	var columns = addAllColumnHeaders(myList, selector);

	for (var i = 0; i < myList.length; i++) {
		var row$ = $('<tr/>');
		for (var colIndex = 0; colIndex < columns.length; colIndex++) {
			var cellValue = myList[i][columns[colIndex]];
			if (cellValue == null) cellValue = '';
			row$.append($('<td/>').html(cellValue));
		}
		$(selector).append(row$);
	}
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(myList, selector) {
	var columnSet = [];
	var headerTr$ = $('<tr/>');

	for (var i = 0; i < myList.length; i++) {
		var rowHash = myList[i];
		for (var key in rowHash) {
			if ($.inArray(key, columnSet) == -1) {
				columnSet.push(key);
				headerTr$.append($('<th/>').html(key));
			}
		}
	}
	$(selector).append(headerTr$);

	return columnSet;
}

function downloadpdf() {
	html2canvas(document.getElementById('table'), {
		onrendered: function(canvas) {
			var data = canvas.toDataURL();
			var docDefinition = {
				content: [
					{
						image: data,
						width: 500
					}
				]
			};
			pdfMake.createPdf(docDefinition).download('Table.pdf');
		}
	});
}
