if (window.XMLHttpRequest){ // code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
}
else{ // code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","../xmls/meniny.xml",false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML; 
var x = xmlDoc.getElementsByTagName("zaznam");




function init()
{
	var today = new Date(); 
	var den = denVRoku(today); // funkcia zisti kolkaty je den
	var text = "";

	// ak je v zazname pre den-1 (dnesok) ,-1 lebo 1. den je s indexom 0 pri poli zaznamov
	if (x[den-1].getElementsByTagName("CZsviatky")[0] != null)
	{
		text += x[den-1].getElementsByTagName("CZsviatky")[0].childNodes[0].nodeValue + ". "; //ak je sviatok tak pridam do textu
	}

	if (x[den-1].getElementsByTagName("SKsviatky")[0] != null)
	{
		text += x[den-1].getElementsByTagName("SKsviatky")[0].childNodes[0].nodeValue + ". "; //ak je sviatok tak pridam do textu
	}
	//ak je v zazname pre dnesok element SK, niekto ma meniny a pridam do stringu text
	if (x[den-1].getElementsByTagName("SK")[0] != null)
	{
		text += "Dnes má meniny " + x[den-1].getElementsByTagName("SK")[0].childNodes[0].nodeValue + ".";
	}
	document.getElementById("meniny").innerHTML = text; //kto ma dnes meniny
	document.getElementById("dnesnyDen").innerHTML = ""+today; //dnesny den
	var elDatum = document.getElementById("datum");
	var elMeno = document.getElementById("meno");
	//listenery na buttony
	elDatum.addEventListener("click", function(){zmazVysledok()}, false);
	elDatum.addEventListener("mouseover", function(){zobrazFormat()}, false);
	elDatum.addEventListener("mouseout", function(){skryFormat()}, false);
	elMeno.addEventListener("click", function(){zmazVysledok()}, false);
}	

function denVRoku(date)
{
	var month = date.getMonth() //januar je to 0, december 11
	var day = date.getDate()	// den v mesiaci
	if (month==1) day+=31;	
	else if (month==2) day+=60;	// pre februar sa pocita aj priestupny rok
	else if (month==3) day+=91;
	else if (month==4) day+=121;
	else if (month==5) day+=152;
	else if (month==6) day+=182;
	else if (month==7) day+=213;
	else if (month==8) day+=244;
	else if (month==9) day+=274;
	else if (month==10) day+=305;
	else if (month==11) day+=335;
	return day;
}

function zmazVysledok()
{
		document.getElementById("vysledok").innerHTML = "<br>";
		document.getElementById("vysledok2").innerHTML = "<br>";
}

function zobrazFormat()
{
		document.getElementById("format").innerHTML = "Format: dd.mm.";	
}

function skryFormat()
{
		document.getElementById("format").innerHTML = "<br>";	
}

function ktoMeniny()
{
	var date = document.getElementById("datum").value;
	if (date == "") 
	{
		alert("Zadajte datum.");
		return;
	}
	var filterdate = /^[0-9]{1,2}.[0-9]{1,2}.$/; // filter 00.00.
	if (!filterdate.test(date) || date[date.length -1]!=".") //filter + bodka
	{
		alert("Nesprávny dátum. Dátum zadavajte vo formáte dd.mm."); 
		document.getElementById("datum").focus();				
		document.getElementById("datum").select();
	}
	else{ //ak uzivatel spravne zadal datum
		var parts =date.split('.'); // rozdelenie datumu podla bodky 		
		var day = Number(parts[0]); // konvertacia na cislo a ulozim ako den
		var month = Number(parts[1]); // -..- ako mesiac
		if (month>12 || month<1 || day<1 || day>31){ // ak datum nie je validny
			alert("Dátum musí byť zmysluplný. Dátum zadavajte vo formáte dd.mm.");
			document.getElementById("datum").focus();
			document.getElementById("datum").select();
		}
		// ak datum je validny, treba zistovak kolkaty den je v roku a kontrolovat pre mesiace, ktore maju menej dni ako 31, ci nebol zadany zly datum ako napr. 31.4
		else{	
		if (month==2){
			if (day>29){
				alert("Neplatný dátum.");
				document.getElementById("datum").focus();
				document.getElementById("datum").select();			
				return;
			}
			else day+=31;	
		}
		else if (month==3) day+=60;
		else if (month==4){
			if (day>30){
				alert("Neplatný dátum.");
				document.getElementById("datum").focus();
				document.getElementById("datum").select();				
				return;
			}
			else day+=91;
		}			
		else if (month==5) day+=121;
		else if (month==6){
			if (day>30){
				alert("Neplatný dátum.");
				document.getElementById("datum").focus();
				document.getElementById("datum").select();				
				return;
			}
			else day+=152;
		}
		else if (month==7) day+=182;
		else if (month==8) day+=213;
		else if (month==9){
			if (day>30){
				alert("Neplatný dátum.");
				document.getElementById("datum").focus();
				document.getElementById("datum").select();				
				return;
			}
			else day+=244;
		}
		else if (month==10) day+=274;
		else if (month==11){
			if (day>30){
				alert("Neplatný dátum.");
				document.getElementById("datum").focus();
				document.getElementById("datum").select();				
				return;
			}
			else day+=305;
		}
		else if (month==12) day+=335;
		// uz viem, kolkaty den v roku je dany datum!
		if (x[day-1].getElementsByTagName("SK")[0] != null) // ak ma niekto meniny
		{		
			var text = "V tento deň má meniny: " + x[day-1].getElementsByTagName("SK")[0].childNodes[0].nodeValue + ".";			
			document.getElementById("vysledok").innerHTML = text;
		}
		else { // ak nema nikto meniny
			var text = "V ten deň nemá nikto meniny!";			
			document.getElementById("vysledok").innerHTML = text;
		}
		}
	}
}

function kedyDatum()
{
	var original = document.getElementById("meno").value;
	var meno = document.getElementById("meno").value.toLowerCase(); 
	if (meno == "") 
	{
		alert("Zadajte meno.");
	}
	else
	{
		meno = odstranDiakritiku(meno); 
		var datum = prehladaj(meno); // zistujem kedy ma meno meniny
		if (datum==null) document.getElementById("vysledok2").innerHTML = "meno sa nenašlo"; // meno sa nenašlo v kalendari
		else
		{ 
			var mesiac = Number(datum[0] + datum[1]); //prve dva preto, lebo v xml je to tymto sposobom
			var den = Number(datum[2] + datum[3]);	
			document.getElementById("vysledok2").innerHTML = original+" má meniny " + den + "." + mesiac + "."; // vypisem datum
		}
	}	
}

function prehladaj(meno)
{
	var i;
	var j;
	for(i=0; i<x.length; i++) //  prechadzanie zaznamu
	{
		if (x[i].getElementsByTagName("SKd")[0] != null) // ak v Skd v danom dni je nieco
		{
			var mena= x[i].getElementsByTagName("SKd")[0].childNodes[0].nodeValue; // vetu s menami si ulozim do "mena"
			var parts = mena.split(','); // rozdelenie na jednotlive mena
			for (j=0;j<parts.length;j++) // pre kazde meno
			{
				parts[j] = odstranDiakritiku2(parts[j].toLowerCase()); // meno zo zoznamu zmenim na male pismena a odstranim diakritiku
				if (parts[j]==meno){
					return x[i].getElementsByTagName("den")[0].childNodes[0].nodeValue; //ak sa zhoduju tak vratim den zo zaznamu
				}
			}
		}
		
	}
	return null; // inak
}


function odstranDiakritiku(meno) // kontrola, ked uzivatel zada meno a chceme zistit meniny, tu je pridana kontrola nedovolenych znakov
{
	var filter = /^[a-z]$/; // filter su znaky bez diakritiky
	var menoNove = ""; 
	for (var i=0;i< meno.length;i++) // prechadzam vsetky znaky mena
	{
		if (!filter.test(meno[i])) // ak je s diakritikou
		{
			if(meno[i] == "á" || meno[i] == "ä") menoNove +="a"; // ak je dany znak s diakritikou nad a do noveho slova pridaj bez diakritiky
			else if(meno[i] == "č" || meno[i] == "ç") menoNove +="c"; // a tak dalej
			else if(meno[i] == "ď" ) menoNove +="d";
			else if(meno[i] == "é" || meno[i] == "ě" || meno[i] == "ë") menoNove +="e";
			else if(meno[i] == "í") menoNove +="i";
			else if(meno[i] == "ľ" || meno[i] == "ĺ") menoNove +="l";
			else if(meno[i] == "ň") menoNove +="n";
			else if(meno[i] == "ó" || meno[i] == "ö" || meno[i] == "ô") menoNove +="o";
			else if(meno[i] == "ř" || meno[i] == "ŕ" ) menoNove +="r";
			else if(meno[i] == "š") menoNove +="s";
			else if(meno[i] == "ť") menoNove +="t";
			else if(meno[i] == "ú" || meno[i] == "ů" || meno[i] == "ü") menoNove +="u";
			else if(meno[i] == "ý") menoNove +="y";
			else if(meno[i] == "ž") menoNove +="z";
			else alert("Nepovolený znak : " + meno[i] + " v mene"); // ak nie je bez diakritiky a nebol v zoznamen
		}
		else menoNove += meno[i]; //ak je bez diakritiky
	}
	return menoNove; // 
}

function odstranDiakritiku2(meno) //kontrola pre kalendar, ked hladam v nom mena
{
	var filter = /^[a-z]$/;
	var menoNove = "";
	for (var i=0;i< meno.length;i++)
	{
		if (!filter.test(meno[i]))
		{
			if(meno[i] == "á" || meno[i] == "ä") menoNove +="a";
			else if(meno[i] == "č" || meno[i] == "ç") menoNove +="c";
			else if(meno[i] == "ď" ) menoNove +="d";
			else if(meno[i] == "é" || meno[i] == "ě" || meno[i] == "ë") menoNove +="e";
			else if(meno[i] == "í") menoNove +="i";
			else if(meno[i] == "ľ" || meno[i] == "ĺ") menoNove +="l";
			else if(meno[i] == "ň") menoNove +="n";
			else if(meno[i] == "ó" || meno[i] == "ö" || meno[i] == "ô") menoNove +="o";
			else if(meno[i] == "ř" || meno[i] == "ŕ" ) menoNove +="r";
			else if(meno[i] == "š") menoNove +="s";
			else if(meno[i] == "ť") menoNove +="t";
			else if(meno[i] == "ú" || meno[i] == "ů" || meno[i] == "ü") menoNove +="u";
			else if(meno[i] == "ý") menoNove +="y";
			else if(meno[i] == "ž") menoNove +="z";
		}
		else menoNove += meno[i];
	}
	return menoNove;
}