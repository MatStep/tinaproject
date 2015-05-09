String.prototype.strtr = function(from,to)
	{
	// Initialisation
	var length = 0;
	var hash = new Array();
	var tmp = "";

	// Taille de la chaine la plus longue ?
	if (from.length < to.length)
	length = from.length;
	else
	length = to.length;

	// Création de la table d'équivalence...
	for (var i=0; i<length; i++) {
	hash[from.charAt(i)] = to.charAt(i);
	}

	// Conversion...
	for (var j=0; j<this.length; j++) {
	var c = this.charAt(j);
	if (hash[c])
	tmp = tmp + hash[this.charAt(j)];
	else
	tmp = tmp + c;
	}

	// retourne le résultat
return tmp;
}



//trieda mapy, kde budú uložené pozície miest
	function Map(name){
		var name;
		var cities = new Array();

		this.name= name;

		this.addCity =  function(x,y,z){ //meno mesta, zem. šírka, zem.výška
			var mesto= {name: x, latitude: y, longitude: z};
			cities.push(mesto);
			//console.log(cities);
		}

		this.getCity =  function(index){ //meno mesta, zem. šírka, zem.výška
			var city = cities[index];
			
			return city;	
		}

		this.getCities = function(){
			return cities;
		}

		this.removeCity = function(){
			cities.pop();
		}

		return this;

	}



$(document).ready(function(){
	var points=0;
	var pointsHistory = new Array();

	var xmlFile; //súbor, kde sú uložené mestá
	var mapArray = new Array;
	var slovensko = new Map("slovensko");
	var europa = new Map("europa");
	var obj;  //aktualne zvolená mapa
	var counter = 0;
	var europeLoc = new google.maps.LatLng(55, 15);
    var slovakiaLoc = new google.maps.LatLng(48.754378, 19.412842);
    var markers = new Array();
    var clickMarker;
    var icon;
    var canEnter;

	var randomNumberList;
	
	var imgLatStart;  //obrázok v bode 0,0 začína v latitude
	var imgLongStart; //obrázok v bode 0,0 začína v longitude
	var latToPixels; //koľko je 1 px v latitude
	var longToPixels;
	var imgStep;

	var bodX;
	var bodY;

	var map;

	var boolClick = false;

	//ajax volanie na získanie údajov
	$.ajax({
	    type: "GET",
	    url: "../xmls/mesta.xml",
	    dataType: "xml",
	    success: parseXml,
        error : function(){
            alert("error");
        }
	});
	//funkcia po úspešnom získaní údajov
	function parseXml(xml){
		var xmlFile = xml;
		var counter= 0;

		
		$(xml).find('city').each(function(){
			var type= $(this).find('type').text();
			var meno = $(this).find('name').text();
			var latitude = $(this).find('latitude').text();
			var longitude = $(this).find('longitude').text();

			if(type == "sk")	////ak je to slovenské mesto, pridá to do slovenskej mapy
			{ 
				slovensko.addCity(meno, latitude, longitude);
			}
			else if(type == "eu") //je to európske mesto, pridá to do európskej mapy
			{
				europa.addCity(meno, latitude, longitude);
			}
			else{
				//console.log($(this).find('type').text());
			}
		});
	}



	function initialize(loc, zoom1) {
	      //crete center of our google map
	    var stylesArray = [
		      {
		        featureType: 'administrative.province',
		        elementType: 'all',
		        stylers: [
		           { visibility: "off" }
		        ]
		      },
		      {
		        featureType: 'administrative.locality',
		        elementType: 'all',
		        stylers: [
		           { visibility: "off" }
		        ]
		      },
		       {
		        featureType: 'administrative.country',
		        elementType: 'labels',
		        stylers: [
		           { visibility: "off" }
		        ]
		      },
		      {
		        featureType: 'administrative.land_parcel',
		        elementType: 'all',
		        stylers: [
		           { visibility: "off" }
		        ]
		      },
		      {
		        featureType: 'road',
		        elementType: 'all',
		        stylers: [
		           { visibility: "off" }
		        ]
		      }
	  	]

	    var mapProp = {
	        center: loc,
	        zoom:zoom1,
	        draggable: true,
	        featureType: "administrative.country",
	      	elementType: "labels",
	      	stylers: [
	        	{ visibility: "off" }
	      	]
	    };

	   
	    //instances of maps in html
	    map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
	    
	    map.setOptions({styles: stylesArray});

	    icon = 
	    			 new google.maps.MarkerImage('../images/marker.png',
				    new google.maps.Size(44, 50),
				    new google.maps.Point(0,0),
				    new google.maps.Point(0, 50)
				);
	    clickMarker = createMarker(0,0,false);
	    clickMarker.setVisible(false);
	    setIconMarker(clickMarker,icon);

	}//end of initialize




	function newCity(index) {
		canEnter=true;

		bodX= obj.getCity(index).longitude;
		bodY= obj.getCity(index).latitude;

		
		clearMarkers();

		$('#nextMapClick').prop('disabled', false);
		$('#nextMap').prop('disabled', false);
		$("#nextMapClick").removeClass("btn-success");
		$("#nextMapClick").addClass("btn-primary");
		$("#nextMap").removeClass("btn-success");
		$("#nextMap").addClass("btn-primary");
		$("#spravna_odpoved").html("");
		

		var random0_1 = Math.random() < 0.5 ? true : false;
		if(random0_1)
		{
			//ak chceme klikať
			$("#zobrazNazov").removeClass('hidden');
			$("#nextMapClick").removeClass('hidden');
			$("#clickControl").removeClass('hidden');

			$("#mapSection").addClass('hidden');
			$("#cityMarker").addClass('hidden');
			$("#input_city_name").addClass('hidden');;
			boolClick = true;
	        map.setOptions({ draggableCursor: 'crosshair' });
	        google.maps.event.addListener(map, 'click', mapClickFunction)
			$("#zobrazNazov").text(obj.getCity(index).name);
			
		}
		else
		{
			//ak chceme aby napísal do textového poľa
			$('#city_name').val('');
			setTimeout(function(){
			    $("#city_name").focus();
			}, 0);
			
			$("#cityMarker").removeClass('hidden');
			$("#input_city_name").removeClass('hidden');
			$("#mapSection").removeClass('hidden');

			$("#clickControl").addClass("hidden");
			$("#zobrazNazov").addClass('hidden');
			$("#nextMapClick").addClass('hidden');
			clickMarker.setVisible(false);
			map.setOptions({ draggableCursor: 'pointer' });
			boolClick = false;
			google.maps.event.clearListeners(map, 'click');
			createMarker(bodY,bodX,true);
			//changeMapPosition(bodY,bodX);
		}
		canEnter = true;
	}

	
	
	$(document).keypress(function(e) {
		
		if(e.which == 13) {
		   	if(canEnter){
		    	if(boolClick)
		        	$("#nextMapClick").trigger('click');
		        else{
		        	$("#nextMap").trigger('click');
		        }
		    }
		    return false;
		}
	});



	var mapClickFunction = function(e){
		
		clickMarker.setVisible(true);

		var latlng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                        	//console.log(e.latLng.lat());
                        	//console.log(e.latLng.lng());
                        }
                    }
        });

        changePositionMarker(clickMarker,e.latLng.lat(), e.latLng.lng());
	};

	//kliknutie na mapu
	$("#nextMapClick").click(function(){
		canEnter = false;
		//$(document).off("keypress");
		var distance;
		var range;
		var distX;
		var distY;


		distX = getMarkerPosition(clickMarker).lng() - bodX;
		distY =  getMarkerPosition(clickMarker).lat() - bodY;
		distance = Math.sqrt(Math.pow(distX,2)+ Math.pow(distY,2));

		if(obj.name == "europa")
			range = 20;
		if(obj.name == "slovensko"){
			range = 7;
		}


		switch(true){
			case(distance < (range/20)): points+=100;$("#plusScore").text("(+100)"); break;
			case(distance < (range/10)): points+=50;$("#plusScore").text("(+50)"); break;
			case(distance < (range/5)): points+=25;$("#plusScore").text("(+25)"); break;
			case(distance < (range/2)): points+=0;$("#plusScore").text("(+0)"); break;
		}

		$(".score").text(points);
		$("#plusScore").show();
		$("#plusScore").fadeOut(2000);
		pointsHistory.push({round:pointsHistory.length+1 , points: points});
		

		$('#nextMapClick').prop('disabled', true);
		$("#nextMapClick").removeClass("btn-primary");
		$("#nextMapClick").addClass("btn-success");
		createMarker(bodY,bodX,true);

		setTimeout(
		  function() 
		  {
		    if(counter < randomNumberList.length-1){
			newCity(randomNumberList[++counter]);	
			}
			else{	//ak skoncil hru
				ohodnot();
				$("#googleMap").addClass('hidden');
				$("#clickControl").addClass("hidden");
				canEnter=false;
				$("#zobrazNazov").addClass('hidden');
				$("#input_city_name").addClass('hidden');
				$("#nextMapClick").addClass('hidden');
				$("#spravna_odpoved").html("");
				$('button').prop('disabled', false);
				$("#koniec_hry").removeClass('hidden');
				$(".score").removeClass('hidden');
				$('#play_again').prop('disabled', false);
				$("#body").addClass('hidden');
				$('#map_wrapper').addClass('hidden');
				makeGraph();
			}
		  }, 2000);


		
	});
 		
	//input mesta
	$("#nextMap").click(function(e){
		canEnter = false;
		//$(document).off("keypress");
		var uhadol = false;
		var porovnaj 
		var inputCity = $("#city_name").val().toLowerCase();
		inputCity = inputCity.strtr("ÁÄČÇĎÉĚËÍŇÓÖŘŠŤÚŮÜÝŽáäčçďéěëíňóöřšťúůüýž", "AACCDEEEINOORSTUUUYZaaccdeeeinoorstuuuyz");
		
		var data = obj.getCity(randomNumberList[counter]).name.toLowerCase();
		var arr = data.split(', ');

		for(i=0; i < arr.length;i++){
			porovnaj = arr[i].strtr("ÁÄČÇĎÉĚËÍŇÓÖŘŠŤÚŮÜÝŽáäčçďéěëíňóöřšťúůüýž", "AACCDEEEINOORSTUUUYZaaccdeeeinoorstuuuyz");

			if(inputCity == porovnaj){
				points += 100;
				$("#plusScore").text("(+100)");
				uhadol = true;
			}
			else{ //neuhádol
				$("#plusScore").text("(+0)");
			}
		}
		
		$("#plusScore").show();
		$("#plusScore").fadeOut(2000);
		pointsHistory.push({round:pointsHistory.length+1 , points: points});

		$("#input_city_name").addClass('hidden');
		
		if(uhadol)
		{
			$("#spravna_odpoved").html("<b>správne :)</b>");
			$("#spravna_odpoved").css("color","green");
		}	
		else
		{
			$("#spravna_odpoved").html("<b>" + obj.getCity(randomNumberList[counter]).name)+"</b>";
			$("#spravna_odpoved").css("color","red");  	
		}	
		
		setTimeout(function(){
			if(counter < randomNumberList.length-1){
				newCity(randomNumberList[++counter]);
				
				$("#zobrazNazov").text(obj.getCity(randomNumberList[counter]).name);
				$(".score").text(points);	
			}
			else{	//ak skoncil hru
				canEnter=false;
				ohodnot();
				$("#googleMap").addClass('hidden');
				$("#clickControl").addClass("hidden");
				$("#zobrazNazov").addClass('hidden');
				$("#input_city_name").addClass('hidden');
				$("#nextMapClick").addClass('hidden');
				$('button').prop('disabled', false);
				$("#spravna_odpoved").html("");
				$(".score").text(points);
				$("#koniec_hry").removeClass('hidden');
				$(".score").removeClass('hidden');
				$('#play_again').prop('disabled', false);
				$("#body").addClass('hidden');
				$('#map_wrapper').addClass('hidden');
				makeGraph();
			}
		}, 2000);
		


		
	});



	//vyber mapy
	$("#buttonHraj").click(function(){
		$("#vyberMapy").addClass('hidden');
		var opt = $("#dropdown").val();
		$('#googleMap').removeClass('hidden').show();
		$("#nadpis").addClass('hidden');
		$("#body").removeClass('hidden');
		$('#map_wrapper').removeClass('hidden').show();
		$('button').prop('disabled', true);

		//na zaklade vyberu mapy sa zvolí Slovesnko alebo Európa
		if(opt == "eu"){ 
			 google.maps.event.addDomListener(window, 'load', initialize(europeLoc,4) );
			 obj = europa;
		}
		else if(opt == "svk") {
			 google.maps.event.addDomListener(window, 'load', initialize(slovakiaLoc,7) );
			 obj = slovensko;
		}


		randomNumberList = new Array();
		randomNumberList = [];
		for(i=0; i<obj.getCities().length;i++)
			randomNumberList.push(i);
		randomNumberList = shuffle(randomNumberList);	
		randomNumberList = randomNumberList.slice(0,10);	

		$("#mapSection").removeClass('hidden');
		newCity(randomNumberList[0]);
		$("#zobrazNazov").text(obj.getCity(randomNumberList[0]).name);
		

	});

	$("#koniec_hry").find("#play_again").click(function(){
		d3.select("svg").remove();
		pointsHistory = [];

		$("#nadpis").removeClass('hidden');
		$("#vyberMapy").removeClass('hidden');
		$("#input_city_name").addClass('hidden');
		$("#koniec_hry").addClass('hidden');


		counter = 0;
		points = 0;
		$(".score").text(points);	

		return false;
	});



	shuffle = function(o){ //v1.0
			for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
	};


	function createMarker(x,y,nonClick) {
		  var place = 	new google.maps.LatLng(x,y);

	      var marker = new google.maps.Marker({
	      	map: map,
	        position:place
	      }); 

	      if(nonClick){
	      	marker.setMap(map);
	      	markers.push(marker);
	      }else{
	      	marker.setMap(map);
	      }

	      return marker;
  	}

  	function deleteMarkers() {
	  clearMarkers();
	  markers = [];
	}

	function changePositionMarker(marker,x,y){
	  		 var latlng = new google.maps.LatLng(x,y);
	    	 marker.setPosition(latlng);
	    	 marker.setMap(map);
	}

	function setIconMarker(marker,icon){
		marker.setIcon(icon);
	}

	function getMarkerPosition(marker){
	  	return marker.getPosition();
	}

	// Sets the map on all markers in the array.
	function setAllMap(map) {
	  for (var i = 0; i < markers.length; i++) {
	    markers[i].setMap(map);
	  }
	}

	// Removes the markers from the map, but keeps them in the array.
	function clearMarkers() {
	  setAllMap(null);
	}

	// Shows any markers currently in the array.
	function showMarkers() {
	  setAllMap(map);
	}

	// Deletes all markers in the array by removing references to them.
	function deleteMarkers() {
	  clearMarkers();
	  markers = [];
	}

	function changeMapPosition(x,y){
		var latlng = new google.maps.LatLng(x,y);
		map.set('center', latlng);
	}

	function ohodnot(){
		switch(true){
			case(points >= 0): $("#hodnotenie").text("Že si len tipoval ? :)");break;
			case (points >= 200): $("#hodnotenie").text("Slušný výsledok, ale máš čo zlepšovať");break;
			case (points >= 400): $("#hodnotenie").text("Dobre si sa učil. Vyznáš sa");break;
			case (points >= 600): $("#hodnotenie").text("Vynikájúci výsledok. Na jedničku");break;
			case (points >= 800): $("#hodnotenie").text("Wow, ty musíš byť geograf");break;
			
		}
	}
	

	function makeGraph() {
       var margin = {top: 30, right: 30, bottom: 75, left: 100}; //--
       var width = 500 - margin.left - margin.right; //--
       var height = 400 - margin.top - margin.bottom;//--


       // Set up time based x axis
       var x = d3.scale.linear() //--
        .domain([0 , pointsHistory.length]) //--
        .range([0, width]); //--

       var y = d3.scale.linear() //--
        .domain([0, pointsHistory[pointsHistory.length-1].points ]) //--
        .range([height, 0]); //--

       var xAxis = d3.svg.axis() //--
        .scale(x) //--
        .ticks(7) //--
        .orient("bottom"); //--

       var yAxis = d3.svg.axis() //--
        .scale(y) //--
        .ticks(7) //--
        .orient("left"); //--

       // put the graph in the "miles" div
       var svg = d3.select("#progress-bar").append("svg") //--
        .attr("width", width + margin.left + margin.right) //--
        .attr("height", height + margin.top + margin.bottom) //--
        .append("g") //--
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //--

       // function to draw the line
       var line = d3.svg.line()  //--
         .x(function(d) { return  x(d.round) })
         .y(function(d) { return  y(d.points) });



       // add the x axis and x-label
       svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 9)
        .attr("x", 9)
        .attr("dy", "0.7em")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");
       svg.append("text")
        .attr("class", "xlabel")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        .text("rounds");

       // add the y axis and y-label
       svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(yAxis);
       svg.append("text")
        .attr("class", "ylabel")
        .attr("y", 0 - margin.left) // x and y switched due to rotation!!
        .attr("x", 0 - (height / 2))
        .attr("dy", "1.5em")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .text("points");


       //draw the line
       svg.append("path")
         .attr("d", line(pointsHistory))
         .attr('fill', 'none')
         .attr('stroke', 'blue')
         .attr('stroke-width', 2);

   }

	 //d3.select("svg").remove();
   //makeGraph();
   

});