$(document).ready(function(){
	var controller = $.superscrollorama();
	

	TweenMax.from( $('#wing'), 2, {opacity:0,scale:0.5,rotation:720} );
	TweenMax.from( $('#first').find("h1"), 0.5, {left:600} );
	TweenMax.from( $('#first').find("h2"), 0.5, {opacity:0,left:90, delay:0.5} );
	TweenMax.staggerFrom( $('.album').find("a"), 0.5, {opacity:0,y:90,delay:0.5},0.2 );
	TweenMax.from('.obsah', 1, {opacity:0,y:100,delay:1});



	//controller.addTween('#fade1', 
	//TweenLite.to($('#fade1'), .5, {css:{opacity:100}}));
	controller.addTween('.left0', TweenMax.from( $('.left0'), .5, {css:{right:'1000px'}, ease:Quad.easeInOut}));
	controller.addTween('.left1', TweenMax.from( $('.left1'), .5, {css:{right:'1000px'}, ease:Quad.easeInOut}));
	controller.addTween('.left2', TweenMax.from( $('.left2'), .5, {css:{right:'1000px'}, ease:Quad.easeInOut}));
	controller.addTween('.left3', TweenMax.from( $('.left3'), .5, {css:{right:'1000px'}, ease:Quad.easeInOut}));
	controller.addTween('.left4', TweenMax.from( $('.left4'), .5, {css:{right:'1000px'}, ease:Quad.easeInOut}));

	controller.addTween('.right0', TweenMax.from( $('.right0'), .5, {css:{left:'1000px'}, ease:Quad.easeInOut}));
	controller.addTween('.right1', TweenMax.from( $('.right1'), .5, {css:{left:'1000px'}, ease:Quad.easeInOut}));
	controller.addTween('.right2', TweenMax.from( $('.right2'), .5, {css:{left:'1000px'}, ease:Quad.easeInOut}));
	controller.addTween('.right3', TweenMax.from( $('.right3'), .5, {css:{left:'1000px'}, ease:Quad.easeInOut}));
	controller.addTween('.right4', TweenMax.from( $('.right4'), .5, {css:{left:'1000px'}, ease:Quad.easeInOut}));

	
});