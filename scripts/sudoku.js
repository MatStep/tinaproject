var xmlDoc = loadXMLDoc("../xmls/sudoku.xml");

function play_game() {
	var rand = Math.floor((Math.random() * 5));
	create_game(xmlDoc, rand);
	print_matrix();
	document.getElementById("points").innerHTML = "0";
	document.getElementById("light").innerHTML = "";
	document.getElementById("light").bgColor = "white";
}

function loadXMLDoc(filename)
{
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else // code for IE5 and IE6
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",filename,false);
	xhttp.send();
	return xhttp.responseXML;
}

var matrix = [[],[],[],[],[],[],[],[],[]];
var solution = [[],[],[],[],[],[],[],[],[]];
var number = ' ';
var points = 0;

function create_game(xml, gameNum) {
	var text = xml.getElementsByTagName("game")[gameNum].childNodes[1].childNodes[0].nodeValue;
	var sol = xml.getElementsByTagName("game")[gameNum].childNodes[3].childNodes[0].nodeValue;
	var k = 0;
	for(i = 0; i < 9; i++){
		for(j = 0; j < 9; j++){
			matrix[i][j] = text[k];
			k++;
		}
		k++;
	}
	
	k=0;
	for(i = 0; i < 9; i++){
		for(j = 0; j < 9; j++){
			solution[i][j] = sol[k];
			k++;
		}
		k++;
	}
}

function print_matrix() {
	var board = document.getElementById("board");
	while(board.firstChild) {
		board.removeChild(board.firstChild);
	}	
	var th;
	for(i = 0; i < 9; i++){
		var row = board.insertRow(i);
		for(j = 0; j < 9; j++){
			var cell = row.insertCell(j);
			
			if(matrix[i][j] == '.'){
				cell.innerHTML = ' ';
				cell.onclick = buttonClick(cell);
			}
			else cell.innerHTML = "<strong>" + matrix[i][j] + "</strong>";

	
		}
	}
}

function buttonClick(cell) {
	return function() { 
		cell.innerHTML = number;
		check_cell(cell);
    };
}

function pickNumber(num) {
	number = num;
	document.getElementById("current").innerHTML = number;
}

function check_cell(cell) {
	var light = document.getElementById("light");
	var pts = document.getElementById("points");
	var y = cell.parentNode.rowIndex;
	var x = cell.cellIndex;
	if(number != ' '){
		if(cell.innerHTML == solution[y][x]) {
			light.innerHTML = "spravne";
			light.bgColor = "green";   
			points += 3;
			pts.innerHTML = points;
			
		}
		else {
			light.innerHTML = "nespravne";
			light.bgColor = "red";
			points--;
			pts.innerHTML = points;
			cell.innerHTML = ' ';
		}
	}
}





