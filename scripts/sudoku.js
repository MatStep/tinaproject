var xmlDoc = loadXMLDoc("../xmls/sudoku.xml");
var scores = [];
var i = 0;
var matrix = [[],[],[],[],[],[],[],[],[]];
var solution = [[],[],[],[],[],[],[],[],[]];
var number = ' ';
var points = 0;

function play_game() {
	var rand = Math.floor((Math.random() * 5));
	create_game(xmlDoc, rand);
	print_matrix();
	scores[i] = points;
	i++;
	points = 0;
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
function graph() {
	// Generate a Bates distribution of 10 random variables.
	var values = d3.range(1000).map(d3.random.bates(10));

	// A formatter for counts.
	var formatCount = d3.format(",.0f");

	var margin = {top: 10, right: 30, bottom: 30, left: 30},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var x = d3.scale.linear()
		.domain([0, 1])
		.range([0, width]);

	// Generate a histogram using twenty uniformly-spaced bins.
	var data = d3.layout.histogram()
		.bins(x.ticks(20))
		(values);

	var y = d3.scale.linear()
		.domain([0, d3.max(data, function(d) { return d.y; })])
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var bar = svg.selectAll(".bar")
		.data(data)
	  .enter().append("g")
		.attr("class", "bar")
		.attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

	bar.append("rect")
		.attr("x", 1)
		.attr("width", x(data[0].dx) - 1)
		.attr("height", function(d) { return height - y(d.y); });

	bar.append("text")
		.attr("dy", ".75em")
		.attr("y", 6)
		.attr("x", x(data[0].dx) / 2)
		.attr("text-anchor", "middle")
		.text(function(d) { return formatCount(d.y); });

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

}

