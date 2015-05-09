// JavaScript menu


var navbar = document.getElementById("navbar");
var currUrlSeg = window.location.href.split('/').pop();

$( document ).ready(function() {
    createNav();
});

function createNav() {

var menu;
	//Get data from JSON file
	if(currUrlSeg=='index.html') {
		$.getJSON('nbproject/menu.json', function(response){
		menu = response;
	}).complete(function () {
	//when completed load

	//remove current content
	var nav = $('ul.nav');
	nav.html('');

	for(var i=0;i<menu.length;i++) {
		if(menu[i].link == "#") {
			makeSub(nav,menu[i]);
		} else {
			makeLi(nav,menu[i]);
		}
	};


}).error(function() {
	console.log('menu.json sa nepodarilo nájsť');
});
}
else {
	$.getJSON('../nbproject/menu.json', function(response){
		menu = response;
	}).complete(function () {
	//when completed load

	//remove current content
	var nav = $('ul.nav');
	nav.html('');

	for(var i=0;i<menu.length;i++) {
		if(menu[i].link == "#") {
			makeSub(nav,menu[i]);
		} else {
			makeLi(nav,menu[i]);
		}
	};


}).error(function() {
	console.log('menu.json sa nepodarilo nájsť');
});
}
}

// makes submenu
	function makeSub(navItem, menuObj) {
		navItem.append('<li class="dropdown" id="' + menuObj.shortName + 'Id"></li>');
		navItem = $(navItem.selector + ' li#' + menuObj.shortName + 'Id').append('<a class="dropdown-toggle" data-toggle="dropdown" href="#">' + menuObj.name + '<b class="caret"></b></a>')
		navItem.append('<ul class="dropdown-menu"></ul>');

		navItem = $(navItem.selector + ' ul.dropdown-menu');

		for (var i = 0; i < menuObj.sub.length; i++) {
			if(menuObj.sub[i].link == "#") {				
				make2ndSub(navItem, menuObj.sub[i], i);
			} else {
				makeLi(navItem, menuObj.sub[i]);
				if(menuObj.link.split('/').pop()==currUrlSeg) {
					makeLiActive(navItem, menuObj.sub[i]);
				}
			}
		};
	}

	function make2ndSub(navItem, menuObj, i) {
		navItem.append('<li class="dropdown-submenu" id="'+ menuObj.shortName + i + '-sub"></li>');
		navItem = $(navItem.selector + ' li#' + menuObj.shortName + i + '-sub').append('<a tabindex="-' + i + '" href="#">' + menuObj.name + '</a>');
		makeUl(navItem, menuObj.sub);
	}



	//makes li and Link
	function makeLi(navItem, menuObj) {
		navItem.append('<li>' +'<a href="../' + menuObj.link + '" >' + menuObj.name + '</a></li>');
	}

	function makeLiActive(navItem, menuObj) {
		navItem.append('<li class="active">' +'<a href="../' + menuObj.link + '" >' + menuObj.name + '</a></li>');
	}

	//makes ul
	function makeUl(navItem, menuObj) {
		navItem.append('<ul class="dropdown-menu"></ul>');
		navItem = $(navItem.selector + ' ul.dropdown-menu');
		for (var i = 0; i < menuObj.length; i++) {
			if (menuObj[i].link == false) {
			} else {
				makeLi(navItem, menuObj[i]);
			}
		};
	}