// var list=[result];
// var list = [
//    { "col_1": "val_11", "col_3": "val_13" },
//  { "col_2": "val_22", "col_3": "val_23" },
//     { "col_1": "val_31", "col_3": "val_33" }
// ];
// Builds the HTML Table out of myList.

var myList;
var data = [];
function checkloguser() {
	if (sessionStorage.getItem('status') == null) {
		window.alert('You have to be signed-in inorder to access this page');
		window.location.href = 'index.html';
		return false;
	}
}
async function getdata() {
	const animalname = document.getElementById('animalname').value;
	const color = document.getElementById('color').value;
	const sex = document.getElementById('sex').value;
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
