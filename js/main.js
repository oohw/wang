var width, height, slideshow, gallery;
var slideshowloop = true;
var slideshow_margin = 0;
$(document).ready(function() {
    width = $(window).outerWidth();
    height = $(window).outerHeight();
    var bgimageidx = Math.round(Math.random()*5-0.5)+1;
    var bgurl = '../img/bg/wang_bckgrnd_00' + bgimageidx + '.jpg';
    console.log("loading background: " + bgurl);
    $('#body').css('backgroundImage','url("' + bgurl + '")');
    init();
});

$(window).resize(function() {
    layout();
    layoutSlideshow();
});

function init() {
    layoutSlideshow();
    startSlideshow();
    layout();
	$('#menu_logo').mouseover(function(){
		// $('#menu_logo path').css('fill','red');
		$('#menu_logoimg').attr("src","../util/wm_logo2red.svg");
	});
	$('#menu_logo').mouseout(function(){
		$('#menu_logoimg').attr("src","../util/wm_logo2.svg");
		// $('#menu_logo path').css('fill','black');
	});
   	$('#email').mouseover(function(event) {
   		var mail1 = 'letstalk';
   		var tada = 'wangmotorcycles.com';
   		$(this).html('<span style="font-size:0.5em;pointer-events:none">' + mail1 + '@' + tada + '</span>');
        slideshowloop = false;
   	});
   	$('#email').mouseout(function(event) {
   		$(this).html('e-mail');
        slideshowloop = true;
        var current = $('.slideshowImage').get(slideshowIndex);
        var goLeft = (width - $(current).outerWidth()) * 0.5 + slideshow_margin;
        setTimeout(function() {
            if (!slideshowactive) {
                animateLoop(current, goLeft);
            }
        }, 0);
   	});
    $('#contactMap').mouseover(function() {
        slideshowloop = false;
    });
    $('#contactMap').mouseout(function() {
        slideshowloop = true;
        var current = $('.slideshowImage').get(slideshowIndex);
        var goLeft = (width - $(current).outerWidth()) * 0.5 + slideshow_margin;
        setTimeout(function() {
            if (!slideshowactive) {
                animateLoop(current, goLeft);
            }
        }, 0);
    });
};

function layout() {
    width = $(window).outerWidth();
    height = $(window).outerHeight();
    $('#content').center(true, true);
};

function layoutSlideshow() {
    slideshow_margin = Math.round(width * 0.1);
    $('.slideshowImage').css('height', (height - 200) + 'px');
    $('.slideshowImage').css('width', 'auto');
    $('#slideshow').outerHeight(height);
    $('#slideshow').outerWidth(width);
    $('.slideshowImage').each(function() {
        var top = (height - $(this).outerHeight()) * 0.5;
        $(this).css('top', top + 'px');
    });
    $('.slideshowImage').css('left', (slideshow_margin + width) + "px");
};

var slideshow_left = 0;
var slideshowIndex = 0;
var slideshowactive = false;

function startSlideshow() {
    var current = $('.slideshowImage').get(slideshowIndex);
    var goLeft = (width - $(current).outerWidth()) * 0.5 + slideshow_margin;
    animateLoop(current, goLeft);
};

function animateLoop(object, goal) {
    slideshowactive = true;
    $("#animator").css('font-size', width).animate({
        fontSize: goal
    }, {
        duration: 800,
        easing: 'swing',
        step: function(now, fx) {
            $(object).css('left', now);
        },
        complete: function() {
            $("#animator").css('font-size', $(object).offset().left).animate({
                fontSize: goal - slideshow_margin * 2
            }, {
                duration: 4000,
                easing: 'linear',
                step: function(now, fx) {
                    $(object).css('left', now);
                },
                complete: function() {
                    $("#animator").css('font-size', $(object).offset().left).animate({
                        fontSize: -$(object).outerWidth()
                    }, {
                        duration: 600,
                        easing: 'easeOutExpo',
                        step: function(now, fx) {
                            $(object).css('left', now);
                        },
                        complete: function() {
                            $('.slideshowImage').css('left', (width) + "px");
                            slideshowIndex++;
                            slideshowIndex %= $('.slideshowImage').size();
                            var current = $('.slideshowImage').get(slideshowIndex);
                            var goLeft = (width - $(current).outerWidth()) * 0.5 + slideshow_margin;
                            if (slideshowloop) {
                                console.log("start slideshow");
                                setTimeout(function() {
                                    animateLoop(current, goLeft);
                                }, 2000);
                            } else {
                                console.log("not start slideshow");
                                slideshowactive = false;
                            }

                        }
                    });
                }
            });
        }
    });
}

// tools

jQuery.fn.center = function(doTop, doLeft) {
    // this.css("position","absolute");
    if (doTop)
        this.css("top", Math.max(0, (($(window).outerHeight() - $(this).outerHeight()) / 2) +
            $(window).scrollTop()) + "px");
    if (doLeft)
        this.css("left", Math.max(0, (($(window).outerWidth() - $(this).outerWidth()) / 2) +
            $(window).scrollLeft()) + "px");
    return this;
}