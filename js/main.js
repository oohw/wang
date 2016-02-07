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
    // $('#body').css('backgroundImage','url("../img/bg/bg.jpg")');
    init();
});

$(window).resize(function() {
    layout();
    layoutSlideshow();
});

function init() {
    setTimeout(function() {
        layout();
    }, 200);

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

    changeContentHeight();
    resizeMap();
    var menuFontsizeH = height*0.03 > 12 ? height*0.03 > 20 ? 20 : height*0.03 : 12;
    var menuFontsizeW = width*0.03 > 12 ? width*0.03 > 20 ? 20 : width*0.03 : 12;
    var menuFontsize = menuFontsizeH < menuFontsizeW ? menuFontsizeH : menuFontsizeW;
    $('.menuitem').css('fontSize',menuFontsize+'px');

    // var fontratio = $('#content').outerHeight()/$('#contenttext_nl').outerHeight();
    // var newFontHeight = fontratio * parseFloat($('#content p').css('fontSize').replace('em',''));
    // $('#content p').css('fontSize',menuFontsize+'px');
    // $('#contactContent p').css('fontSize',menuFontsize+'px');
    // $('#contactContent h1').css('fontSize',menuFontsize+'px');
};

function changeContentHeight(){
    if(width < height){
        var contentStart = $('#menu_logoimg').offset().top + $('#menu_logoimg').outerHeight();
        var contentEnd = height-$('#menuGallery').offset().top;
        var contentmarg = contentStart > contentEnd ? contentStart*2 : contentEnd*2;
        $('#content').height((height-(contentmarg))*2);
        $('#content').offset({top: contentStart + 'px'});
        $('.content_text').width((width/2)-40);
        // $('#content').center(true, true);
    } else {
        var contentStart = $('#menu_logoimg').offset().top + $('#menu_logoimg').outerHeight();
        var contentEnd = height-$('#menuGallery').offset().top;
        var contentmarg = contentStart > contentEnd ? contentStart*2 : contentEnd*2;
        $('#content').height(height-(contentmarg));
        $('#content').center(true, true);
        $('.content_text').width((width/3)-40);
    }
    if ( 340 > $($('.content_text')[2]).outerWidth() ){
        $('#maps').width($($('.content_text')[2]).outerWidth());
    } else {
        $('#maps').width(340);
    }
        // console.log( $($('.content_text')[2]).outerWidth() );
}


function layoutSlideshow() {
    // stop current slideshow
    // var current = $('.slideshowImage').get(slideshowIndex);
    // var goLeft = (width - $(current).outerWidth()) * 0.5 + slideshow_margin;
    // $(current).css('left', goLeft);
    // slideshowactive = false;
    // $('#animator').stop(true,true).css('font-size', 0.0).animate({
    //     fontSize: 1.0
    // }, {
    //     duarion: 500,
    //     complete: function(){
    //         slideshowactive = true;
    //     }
    // });
    slideshow_margin = Math.round(width * 0.1);
    $('.slideshowImage').css('height', (height - height*0.0) + 'px');
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
                                // console.log("start slideshow");
                                setTimeout(function() {
                                    animateLoop(current, goLeft);
                                }, 2000);
                            } else {
                                // console.log("not start slideshow");
                                slideshowactive = false;
                            }

                        }
                    });
                }
            });
        }
    });
}

function resizeMap(){
    var mh = height-($("#maps").offset().top + (height-$("#menuInstagram").offset().top));
    $("#maps").height(mh);
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