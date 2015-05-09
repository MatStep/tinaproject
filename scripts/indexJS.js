$(document).ready(function(){
	var controller = $.superscrollorama();

	//TweenLite.to( $('#fade1'), .5, {css: {opacity:0}} );

	//controller.addTween('#fade1', 
	//TweenLite.to($('#fade1'), .5, {css:{opacity:100}}));
	controller.addTween('.dd2', TweenMax.from( $('.dd2'), .5, {css:{right:'1000px'}, ease:Quad.easeInOut}));

	
});