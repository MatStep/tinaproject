var zadanie;
var napoveda;
var riesenie;
var solutionCheck;
var solutionPile;
var unsolved;
var x;
var puzzleIndex;
var score;
var scoreArr;
var helpUsed;
var solutionUsed;

function loadXMLDoc(filename){
    if (window.XMLHttpRequest){
        var xhttp=new XMLHttpRequest();
    }
    else{
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",filename,false);
    xhttp.send();
    
    return xhttp.responseXML;
}

function createDragAndDrop(){
    $('.draggable').draggable({ revert: true, start: handleDragEvent });
    $('.droppable').droppable({
        drop: handleDropEvent,
        accept: '.draggable',
        hoverClass: 'hovered'
    });
}

function readData(){
    var i;
    var xmlDoc = loadXMLDoc("../xmls/anagramy.xml");

    x = xmlDoc.getElementsByTagName("uloha");
    
    for( i = 0; i < x.length; i++){
        zadanie[i] = x[i].children[0].innerHTML.toUpperCase();
        napoveda[i] = x[i].children[1].innerHTML.toUpperCase();
        riesenie[i] = x[i].children[2].innerHTML.toUpperCase();
    }
}

function handleDragEvent(){
    $(this).draggable( 'option', 'revert', true );
}

function handleDropEvent( event, ui ) {
    var draggable = ui.draggable;
    draggable.draggable( 'disable' );
    draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    draggable.draggable( 'option', 'revert', false );
    $(this).droppable( 'disable' );
    solutionPile[$(this).index(".droppable")] = draggable[0].innerHTML;
    isDropped = true;
    
    var isSame = solutionCheck.every(function(element, index) {
        return element === solutionPile[index]; 
    });
    
    if(isSame){
        if(solutionUsed === false){
            changeScore(30);
        }
        else{
            solutionUsed = false;
        }
        helpUsed = false;
        unsolved = $.grep(unsolved, function(value) {return value != unsolved[puzzleIndex];});
        if(unsolved.length !== 0 && puzzleIndex < unsolved.length){
            reset();
        }
        else if(unsolved.length !== 0){
            puzzleIndex--;
            reset();
        }
        else{
            $("#end").show();
            $("#endNote").text("Gratulujem, Vyhrali ste! Vaše skóre: " + score + "/" + (zadanie.length * 30));
        }
    }
}

function createPuzzle(){
    var i;
    var temp;
    
    for( i = 0; i < zadanie[(unsolved[puzzleIndex])].length; i++){
        if(zadanie[(unsolved[puzzleIndex])][i] !== " ")
            $("#draggablePile").append("<div class=\"draggable\">" + zadanie[(unsolved[puzzleIndex])][i] + "</div>");
        else
            $("#draggablePile").append("<div class=\"space\"></div>");
    }
    
    temp = riesenie[(unsolved[puzzleIndex])].replace(" ", "");
    solutionCheck = temp.split("");
    
    for( i = 0; i < riesenie[(unsolved[puzzleIndex])].length; i++){
        if(riesenie[(unsolved[puzzleIndex])][i] !== " ")
            $("#droppablePile").append("<div class=\"droppable\"></div>");
        else
            $("#droppablePile").append("<div class=\"space\"></div>");
    }
}

function init(){
    zadanie = new Array();
    napoveda = new Array();
    riesenie = new Array();
    solutionCheck = new Array();
    solutionPile = new Array();
    unsolved = new Array();
    scoreArr = new Array;
    helpUsed = false;
    solutionUsed = false;
    puzzleIndex = 0;
    score = 0;
    
    readData();
    
    for(var i = 0; i < zadanie.length; i++)
        unsolved[i] = i;
    
    createPuzzle();

    createDragAndDrop();
    
    hideSolution();
    hideHelp();
    
    $(".forwardButton").css("visibility", "visible");
    
}

function reset(){
    $("#droppablePile").empty();
    $("#draggablePile").empty();
    solutionPile = [];
    
    createPuzzle();
    
    createDragAndDrop();
    hideSolution();
    hideHelp();
    
    if(puzzleIndex > 0){
        $(".backButton").css("visibility", "visible");
    }
    
    if(puzzleIndex === (unsolved.length - 1)){
        $(".forwardButton").css("visibility", "hidden");
        $(".backButton").css("visibility", "visible");
    }
    
    if(puzzleIndex === (0)){
        $(".backButton").css("visibility", "hidden");
        $(".forwardButton").css("visibility", "visible");
    }
    
    if(unsolved.length === 1){
        $(".backButton").css("visibility", "hidden");
        $(".forwardButton").css("visibility", "hidden");
    }
    
}
$(document).on("click","#help",
    function(){
        if(helpUsed === false){
            changeScore(-2);
            $("#help").text(napoveda[(unsolved[puzzleIndex])]);
            helpUsed = true;
        }
    }
);

function hideHelp(){
    $("#help").text("Zobraz nápovedu");
}

$(document).on("click","#forward",
function(){
    solutionUsed = false;
    helpUsed = false;
    puzzleIndex++;
    reset();
});

$(document).on("click","#back",
function(){
    solutionUsed = false;
    helpUsed = false;
    puzzleIndex--;
    reset();
});

$(document).on("click","#aboutStart",
function(){
    $("#aboutPanel").show();
});

$(document).on("click","#aboutClose",
function(){
    $("#aboutPanel").hide();
});

$(document).on("click","#graphClose",
function(){
    $("#graphPanel").hide();
});

$(document).on("click","#buttonSolution",
    function(){
        $("#solution").show();
        $("#solution").text(riesenie[(unsolved[puzzleIndex])]);
        if(solutionUsed === false)
            solutionUsed = true;
    }
);

$(document).on("click","#buttonReset",
    function(){
        changeScore(-5);
        reset();
    }
);
$(document).on("click","#newGame",
    function(){
        $("#droppablePile").empty();
        $("#draggablePile").empty();
        init();
        $("#end").hide();
    }
);

function hideSolution(){
    $("#solution").hide();
}

function changeScore(value){
    score += value;
    scoreArr.push(score);
    $("#score").text("Score: " + score);
}

$(document).on("click",".makeGraph",
    function(){
    d3.select("svg").remove();
    var graphData = new Array();
    graphData[0]= new Object({x: 0, y:0});
    for(var i = 0; i< scoreArr.length; i++){
        graphData[i+1]= new Object({x: i+1, y:scoreArr[i]});
    }

    var WIDTH = 700,
    HEIGHT = 400,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    };
            
    var vis = d3.select('#miles')
            .append("svg") 
            .attr("width", WIDTH + MARGINS.left + MARGINS.right)
            .attr("height", HEIGHT + MARGINS.top + MARGINS.bottom)
            .append("svg:g");
    
    var xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(graphData, function(d) {
      return d.x;
    }), d3.max(graphData, function(d) {
      return d.x;
    })]),
    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(graphData, function(d) {
      return d.y;
    }), d3.max(graphData, function(d) {
      return d.y;
    })]),
    xAxis = d3.svg.axis()
        .tickFormat(d3.format("d"))
        .scale(xRange)
        .tickSize(3),
        
    yAxis = d3.svg.axis()
        .tickFormat(d3.format("d"))
        .scale(yRange)
        .tickSize(3)
        .orient('left')
        .tickSubdivide(true);
 
    vis.append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
        .attr('stroke', '#5a5a5a')
        .attr('fill','none')
        .attr('stroke-width', 1)
        .attr('shape-rendering','crispEdges')
        .call(xAxis);

    vis.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", WIDTH / 2)
        .attr("y", HEIGHT + MARGINS.bottom);
     

    vis.append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
        .attr('stroke', '#5a5a5a')
        .attr('fill','none')
        .attr('stroke-width', 1)
        .attr('shape-rendering','crispEdges')
        .call(yAxis);

    vis.append("text")
        .attr("fill", "#00005a")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("y", 3)
        .attr("x", 0 - (HEIGHT / 2))
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Počet bodov");

     var lineFunc = d3.svg.line()
        .x(function(d) {
          return xRange(d.x);
        })
        .y(function(d) {
          return yRange(d.y);
        })
        .interpolate('linear');

    vis.append('svg:path')
        .attr('d', lineFunc(graphData))
        .attr('stroke', '#00005a')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

     $("#graphPanel").show();
});
