var width, height, slideshow, gallery;

var slideshow_margin = 0;
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
	layoutSlideshow();
	startSlideshow();
	layout();
	$('#fb-page').hide(100);
	// $('#contentainer').hide(100);
	$('.x').click(function(){
		$(this).parent().hide(1000);
	})
};

function layout(){
	width = $(window).outerWidth();
	height = $(window).outerHeight();
	$('#menu').center(false,true);
	$('.fb-page').center(false,true);
	$('#contentainer').width(width);
	$('#contentainer').height(height);
	$('#contentainer').css('top',height+'px');
	$('#contentainer').center(false,true);
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

function layoutSlideshow(){
	slideshow_margin = Math.round(width*0.1);
	$('.slideshowImage').css('width',(width+slideshow_margin)+'px');
	$('.slideshowImage').css('height','auto');
	// $('#slideshow').outerWidth($('.slideshowImage').size()*(width+slideshow_margin));
	$('#slideshow').outerHeight(height);
	$('#slideshow').outerWidth(width);
	$('.slideshowImage').each(function(){$(this).css('top',('-' + ($(this).outerHeight()-height)*0.5) + 'px'); });
};

function gallery(){
	console.log("shityo");
};

var slideshow_left = 0;
function startSlideshow(){
	// $('#slideshow').css('transition', 'all 5s linear');
	// $('#slideshow').css('left', '-100px');
	var newleft = slideshow_left+slideshow_margin;
	$("#animator").css('font-size', slideshow_left).animate({ fontSize: newleft }, {
	    duration: 4000,
	    easing: 'linear',
	    step: function(now,fx) {
	    	$('.slideshowImage').css('left',-now);
	    },
	    complete: function(){
	    	slideshow_left = newleft;
	    	newleft += width;
	    	newleft %= (width+slideshow_margin)*$('.slideshowImage').size();
			// $('#slideshow').css('transition', 'all 1s linear');
			// $('#slideshow').css('left', '0px');
	    	$("#animator").css('font-size', slideshow_left).animate({ fontSize: newleft }, {
			    duration: 250,
			    easing: 'easeOutQuad',
			    step: function(now,fx) {
			    	$('.slideshowImage').css('left',-now);
			    },
			    complete: function(){
	    			slideshow_left = newleft;
	    			slideshow_left %= (width+slideshow_margin)*($('.slideshowImage').size()-1);
					startSlideshow();
			    }
			});
	    }
	});
};

function facebook(){
	if($('#fb-page').is(":visible"))
		$('#fb-page').hide(100);
	else
		$('#fb-page').show(100);
}
function wang(){
    $('html, body').animate({
        scrollTop: $("#contentainer").offset().top
    }, 200);
}

function instagram(){
	window.open('http://instagram.com/wangmotorcycles', '_blank');
}




// tools

jQuery.fn.center = function (doTop, doLeft) {
    // this.css("position","absolute");
    if(doTop)
    	this.css("top", Math.max(0, (($(window).outerHeight() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
	if(doLeft)
    	this.css("left", Math.max(0, (($(window).outerWidth() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}