$(document).ready(function(){
	var controller = $.superscrollorama();

	controller.addTween('#fade', 
	    TweenMax.from($('#fade'), .5, {css:{opacity:0}}));
	
});