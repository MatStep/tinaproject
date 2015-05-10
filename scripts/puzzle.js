// Puzzle JavaScript

/* Used external sources links Chart http://bl.ocks.org/mbostock/3885304
 * http://interactjs.io/
 * http://vuc2013.volimludi.sk/wp-content/themes/volimludi/images/mapaSR_volimludi.png
*/

var points = 0;
var kraje = 0;
var pBox = document.getElementById('points');
var validator = [0,0,0,0,0,0,0,0];
var games = 0;
var graphExist =0;
var clicked=0;

var scores = [];

var x;
var y;
var target;
var width;
var height;

//Initialsation
function init() {
	$('#puzzle').load('puzzle.html #inner');
	points = 0;
	kraje = 0;
	document.getElementById('points').innerHTML=points;
}

//show graph
function graph() {
	if(games>0) {
		scores.push({ game: games, points: points});
		document.getElementById('graphShow').style.display = 'block';
		if(graphExist == 0)
			createGraph();
		else {
			var elem = document.getElementById("graphShow");
			elem.parentNode.removeChild(elem);
			var graphOuter = document.getElementById("graphOuter");
			var newGraph = document.createElement("div");
			newGraph.id = 'graphShow';
			var h1Text = document.createElement("h1");
			h1Text.innerHTML = "Graf dosiahnutých výsledkov";
			graphOuter.appendChild(newGraph);
			newGraph.appendChild(h1Text);
			createGraph();
			document.getElementById('graphShow').style.display = 'block';
		}
	}
	else {
		document.getElementById('message').innerHTML = 'Pred vykreslením dohrajte hru';
		document.getElementById('message').style.display = 'block';
	}
}

//create grapg
function createGraph() {
	graphExist = 1;
	var margin = {top: 20, right: 20, bottom: 50, left: 50};
	width = 800 - margin.left - margin.right;
	height = 500 - margin.top - margin.bottom;

	var x = d3.scale.linear()
	.range([0, width]);

	var y = d3.scale.linear()
	.range([height, 0]);

	var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

	var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

	var tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) {
		return "<strong>Body:</strong> <span style='color:#A8CBEE'>" + d.points + "</span>";
	})

	var svg = d3.select("#graphShow").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.call(tip);

	var data = scores.map(function(d) {
		return {
			game: d.game,
			points: d.points
		};
	});

	x.domain(d3.extent(data, function(d) { return d.game; }));
	y.domain([0, d3.max(data, function(d) {return d.points })]);

	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis)
	.append("text")
	.attr("x", 400)
	.attr("y", 40)
	.style("text-anchor", "middle")
    .style("fill", "none")
    .style("stroke", "#000")
    .style("shape-rendering", "crispEdges")
	.text("Hry");

	svg.append("g")
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
    .style("fill", "none")
    .style("stroke", "#000")
    .style("shape-rendering", "crispEdges")
	.text("Body");

	svg.selectAll(".bar")
	.data(data)
	.enter().append("rect")
	.attr("class", "bar")
	.attr("x", function(d) { return x(d.game); })
	.attr("width", 30)
	.attr("y", function(d) { return y(d.points); })
	.attr("height", function(d) { return height - y(d.points);})
    .style("fill","#1975D1")
	.on('mouseover', tip.show)
	.on('mouseout', tip.hide);
}

//show help
function help() {
	clicked++;
	if(clicked%2 ==1) {
		document.getElementById("help").style.display = 'block';
	}
	else
		document.getElementById("help").style.display = 'none';
}

//draggable functions
interact('.draggable')
.draggable({

    inertia: true,

    restrict: {
    	restriction: "parent",
    	endOnly: true,
    	elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },

    onmove: dragMoveListener,
    onend: function() {
    	if (validator[0]==1) {
    		document.getElementById('baId').className = 'notdraggable';
    		addNums();
    	}
    	if (validator[1]==1) {
    		document.getElementById('ttId').className = 'notdraggable';
    		addNums();
    	}
    	if (validator[2]==1) {
    		document.getElementById('tnId').className = 'notdraggable';
    		addNums();
    	}
    	if (validator[3]==1) {
    		document.getElementById('nrId').className = 'notdraggable';
    		addNums();
    	}
    	if (validator[4]==1) {
    		document.getElementById('zaId').className = 'notdraggable';
    		addNums();
    	}
    	if (validator[5]==1) {
    		document.getElementById('bbId').className = 'notdraggable';
    		addNums();
    	}
    	if (validator[6]==1) {
    		document.getElementById('poId').className = 'notdraggable';
    		addNums();
    	}
    	if (validator[7]==1) {
    		document.getElementById('keId').className = 'notdraggable';
    		addNums();
    	}
    	if(kraje==8) {
    		document.getElementById('endGame').innerHTML = 'Vyhrali ste s počtom bodov ' + points;
    		games++;
    	}
    }
});

//adding numbers
function addNums() {
	points+=1000;
	kraje++;
	document.getElementById('points').innerHTML=points;
	document.getElementById('places').textContent=kraje;
}

// drag moveListener
function dragMoveListener (event) {
	var target = event.target,
        
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
   
    target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    if((target.id=="baId") && (x>-135 && x<-125) && (y>410 && y<420)) {
    	target.setAttribute('data-x', -130);
    	target.setAttribute('data-y', 415);
    	validator[0]=1;
    }
    else {
    	validator[0]=0;
    	points--;
    }
    if((target.id=="ttId") && (x>-118 && x<-108) && (y>340 && y<350)) {
    	target.setAttribute('data-x', -113);
    	target.setAttribute('data-y', 345);
    	validator[1]=1;
    }
    else {
    	validator[1]=0;
    	points--;
    }
    if((target.id=="tnId") && (x>-48 && x<-38) && (y>245 && y<255)) {
    	target.setAttribute('data-x', -43);
    	target.setAttribute('data-y', 250);
    	validator[2]=1;
    }
    else {
    	validator[2]=0;
    	points--;
    }
    if((target.id=="nrId") && (x>-1 && x<9) && (y>380 && y<390)) {
    	target.setAttribute('data-x', 4);
    	target.setAttribute('data-y', 385);
    	validator[3]=1;
    }
    else {
    	validator[3]=0;
    	points--;
    }
    if((target.id=="zaId") && (x>107 && x<117) && (y>183 && y<193)) {
    	target.setAttribute('data-x', 112);
    	target.setAttribute('data-y', 188);
    	validator[4]=1;
    }
    else {
    	validator[4]=0;
    	points--;
    }
    if((target.id=="bbId") && (x>119 && x<129) && (y>337 && y<347)) {
    	target.setAttribute('data-x', 124);
    	target.setAttribute('data-y', 342);
    	validator[5]=1;
    }
    else {
    	validator[5]=0;
    	points--;
    }
    if((target.id=="poId") && (x>330 && x<340) && (y>218 && y<228)) {
    	target.setAttribute('data-x', 335);
    	target.setAttribute('data-y', 223);
    	validator[6]=1;
    }
    else {
    	validator[6]=0;
    	points--;
    }
    if((target.id=="keId") && (x>380 && x<390) && (y>320 && y<330)) {
    	target.setAttribute('data-x', 385);
    	target.setAttribute('data-y', 325);
    	validator[7]=1;
    }
    else {
    	validator[7]=0;
    	points--;
    }
}

  
  window.dragMoveListener = dragMoveListener;

//dropzone function
  interact('.dropzone').dropzone({

  	accept: '#yes-drop #baId #ttId #tnId #poId #nrId #keId #bbId #zaId',
  
  overlap: 1,


  ondropactivate: function (event) {

    event.target.classList.add('drop-active');
},
ondragenter: function (event) {
	var draggableElement = event.relatedTarget,
	dropzoneElement = event.target;


    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
},
ondragleave: function (event) {

    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
},
ondropdeactivate: function (event) {

    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
}
});