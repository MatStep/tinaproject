var xmlDoc = loadXMLDoc("../xmls/sudoku.xml");
var graphData = new Array;
var scores = [];
var pocet_hier = 0;
var matrix = [[],[],[],[],[],[],[],[],[]];
var solution = [[],[],[],[],[],[],[],[],[]];
var number = ' ';
var points = 0;

function play_game() {
	var rand = Math.floor((Math.random() * 5));
	create_game(xmlDoc, rand);
	print_matrix();
	scores[pocet_hier] = points;
	pocet_hier++;
	points = 0;
	graph();
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
	var graf = document.getElementById("visualisation");
	while (graf.firstChild) {
		graf.removeChild(graf.firstChild);
	}
 
var l;
var lineData = [];
console.log(pocet_hier);

for(l = 0; l < pocet_hier; l++){
	console.log(scores[l]);
	lineData[l] = new Object({x: parseInt(l+1), y: parseInt(scores[l])});
}


  var vis = d3.select("#visualisation"),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },
    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function (d) {
        return d.x;
      }),
      d3.max(lineData, function (d) {
        return d.x;
      })
    ]),

    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
        return d.y;
      }),
      d3.max(lineData, function (d) {
        return d.y;
      })
    ]),

    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),

    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient("left")
      .tickSubdivide(true);


  vis.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);

  vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

  var lineFunc = d3.svg.line()
  .x(function (d) {
    return xRange(d.x);
  })
  .y(function (d) {
    return yRange(d.y);
  })

vis.append("svg:path")
  .attr("d", lineFunc(lineData))
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("fill", "none");

}

