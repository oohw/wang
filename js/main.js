var width, height, slideshow, gallery;

$(document).ready(function() {
	width = $(window).outerWidth();
	height = $(window).outerHeight();
	init();
});

$( window ).resize(function() {
	layout();
});

function init(){
	buildMenu();
	buildSlideshow();
	startSlideshow();
	layout();
};

function layout(){
	width = $(window).outerWidth();
	height = $(window).outerHeight();
	$('#menu').center(false,true);
	// var menuleft = (width - $('#menu').outerWidth())*0.5;
	// $('#menu').css('left',menuleft+'px');
	console.log('layouted menu ' +$('#menu').outerWidth());
};

function buildMenu(){
	$('.class').each(function(){
		$(this).outerWidth( $($(this).children()[0]).outerWidth()  );
		console.log( $($(this).children()[0]).outerWidth() );
	});

	console.log('built menu');
};

function buildSlideshow(){
	$('#slideshow').append('<div id="yeah" style="position:absolute; left:0px;"><h1>YEAH</h1></div>');
	$('#yeah').css('left', '0px');

	$('#yeah').css('position', 'absolute');
};

function gallery(){
	console.log("shityo");
};

function loadSlideshow(slideimages) {
	slideshow = slideimages;
}

function startSlideshow(){
	$('#slideshow').css('transition', 'all 10s linear');
	$('#slideshow').css('left', '100px');
	$("#animator").css('font-size', 0).animate({ fontSize: 12.0 }, {
	    duration: 10000,
	    easing: 'linear',
	    step: function(now,fx) {
	    	// $('#slideshow').css('left',now);
	    },
	    complete: function(){

			$('#slideshow').css('transition', 'all 1s linear');
			$('#slideshow').css('left', '0px');
	    	$("#animator").css('font-size', 12.0).animate({ fontSize: 0 }, {
			    duration: 10000,
			    easing: 'linear',
			    step: function(now,fx) {
			    	// $('#slideshow').css('left',now);
			    },
			    complete: function(){
					startSlideshow();
			    }
	});	    }
	});
};





// tools

jQuery.fn.center = function (doTop, doLeft) {
    this.css("position","absolute");
    if(doTop)
    	this.css("top", Math.max(0, (($(window).outerHeight() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
	if(doLeft)
    	this.css("left", Math.max(0, (($(window).outerWidth() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}