function isElementVisible(elementToBeChecked)
{
    var TopView = $(window).scrollTop();
    var BotView = TopView + $(window).height();
    var TopElement = $(elementToBeChecked).offset().top;
    var BotElement = TopElement + $(elementToBeChecked).height();
    return ((BotElement <= BotView) && (TopElement >= TopView));
}

$(document).ready(function(){
	var controller = $.superscrollorama({
		reverse:false
	});
	

	TweenMax.from( $('#wing'), 2, {opacity:0,scale:0.5,rotation:720} );
	TweenMax.from( $('#first').find("h1"), 0.5, {left:600} );
	TweenMax.from( $('#first').find("h2"), 0.5, {opacity:0,left:90, delay:0.5} );
	TweenMax.staggerFrom( $('.album').find("a"), 0.5, {opacity:0,y:90,delay:0.5},0.2 );
	TweenMax.from('.obsah', 1, {opacity:0,y:100,delay:1});

	var left4 = $('.left4');
	var right4 = $('.right4');
	

	var t1 = TweenMax.from( $('.left0'), 0.7, {css:{right:'500px',opacity:0}, ease:Quad.easeInOut});
	var t1r = TweenMax.from( $('.right0'), 0.7, {css:{left:'500px',opacity:0}, ease:Quad.easeInOut});

	var t2 = TweenMax.from( $('.left1'), 0.7, {css:{right:'500px',opacity:0}, ease:Quad.easeInOut});
	var t2r = TweenMax.from( $('.right1'), 0.7, {css:{left:'500px',opacity:0}, ease:Quad.easeInOut});


	controller.addTween('.left0', t1);
	controller.addTween('.left1', t2);
	controller.addTween('.left2', TweenMax.from( $('.left2'), 0.7, {css:{right:'300px',opacity:0}, ease:Quad.easeInOut} ));
	controller.addTween('.left3', TweenMax.from( $('.left3'), 0.7, {css:{right:'300px',opacity:0}, ease:Quad.easeInOut}));
	controller.addTween('.left4', TweenMax.from( $('.left4'), 0.7, {css:{right:'300px',opacity:0}, ease:Quad.easeInOut}));
	controller.addTween('.left4', TweenMax.from( $('.right4'), 0.7, {css:{left:'300px',opacity:0}, ease:Quad.easeInOut}));

	controller.addTween('.right0', t1r);
	controller.addTween('.right1', t2r);
	controller.addTween('.right2', TweenMax.from( $('.right2'), 0.7, {css:{left:'500px',opacity:0}, ease:Quad.easeInOut}));
	controller.addTween('.right3', TweenMax.from( $('.right3'), 0.7, {css:{left:'500px',opacity:0}, ease:Quad.easeInOut}));
	//controller.addTween('.right4', TweenMax.from( $('.right4') ,0.7, {css:{left:'500px'}, ease:Quad.easeInOut}));

	if(isElementVisible(".left1")){
		//t2.killAll();
		t2.play();
		t2r.play();
	}


	if(isElementVisible(".left0")){
		//t1.killAll();
		t1.play();
		t1r.play();
	}
	
});