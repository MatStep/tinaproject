var aktTajnicka;
var aktNapovedy = new Array();
var aktRiesenia = new Array();

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

function init(){
    var xmlDoc = loadXMLDoc("../xmls/krizovka.xml");
    var aktTabulka = document.getElementById("tab1");
    var j;
    var i;
    var k;
    x = xmlDoc.getElementsByTagName("krizovky");
    for( j = 1; j < x[0].children[0].children.length; j++){
        aktNapovedy[j-1] = x[0].children[0].children[j].children[0].innerHTML;
        aktRiesenia[j-1] = x[0].children[0].children[j].children[1].innerHTML;
    }
    console.log(aktNapovedy.length);
    //console.log(aktRiesenia);
    document.getElementById("textyLave").innerHTML = "NÁPOVEDY:" + "<br>";
    for (i=1; i<=aktNapovedy.length; i++){
        document.getElementById("textyLave").innerHTML = document.getElementById("textyLave").innerHTML +i+" "+aktNapovedy[i-1]+"<br>";
    }
}

function zobrazRiesenie(index){
    var pom = "riesenie"+index;
    document.getElementById(pom).value = aktRiesenia[index];
}

function skontrolujTajnicku1(){
    var xmlDoc = loadXMLDoc("../xmls/krizovka.xml");
    var slovoZtajnicky = "";
    var aktTabulka = document.getElementById("tab1");
    var i;
    var j;
    var length = aktTabulka.childNodes[1].children.length;;
    var riadky = aktTabulka.childNodes[1].children;
    for (i=0; i<length; i++){
        if (riadky[i].children[6].childNodes[0].value != undefined){
            slovoZtajnicky +=riadky[i].children[6].childNodes[0].value;
        }
    }
    //console.log(slovoZtajnicky);
    x = xmlDoc.getElementsByTagName("krizovky");
    aktTajnicka = x[0].children[0].children[0].innerHTML;
    if (slovoZtajnicky == aktTajnicka){
        window.alert("Gratulujem, dokončili ste krížovku")
    }
    if (slovoZtajnicky != aktTajnicka){
        window.alert("Nesprávna tajnička, skúste ešte raz")
    }
    //console.log(aktTajnicka);
}