
var width, height, shiftUpSize;

$('#gallery').width(width);
$('#gallery').height(height);
// var gallerytop = 140;
// $('#gallery').css('top',gallerytop + 'px');

$(document).ready(function() {
	width = $(window).outerWidth();
	height = $(window).outerHeight();

	shiftUpSize = height * 0.75;
	
	$('#menu_logo').mouseover(function(){
		// $('#menu_logo path').css('fill','red');
		$('#menu_logoimg').attr("src","../util/wm_logo2red.svg");
	});
	$('#menu_logo').mouseout(function(){
		$('#menu_logoimg').attr("src","../util/wm_logo2.svg");
		// $('#menu_logo path').css('fill','black');
	});
	var bgimageidx = Math.round(Math.random()*5-0.5)+1;
	var bgurl = '../img/bg/wang_bckgrnd_00' + bgimageidx + '.jpg';
	console.log("loading background: " + bgurl);
	$('#body').css('backgroundImage','url("' + bgurl + '")');
});

var GPlusGallery = (function($) {
	/* ------------ PRIVATE functions ------------ */

	/** Utility function that returns a value or the defaultvalue if the value is null */
	var $nz = function(value, defaultvalue) {
		if( typeof (value) === undefined || value == null) {
			return defaultvalue;
		}
		return value;
	};
	
	/**
	 * Distribute a delta (integer value) to n items based on
	 * the size (width) of the items thumbnails.
	 * 
	 * @method calculateCutOff
	 * @property len the sum of the width of all thumbnails
	 * @property delta the delta (integer number) to be distributed
	 * @property items an array with items of one row
	 */
	var calculateCutOff = function(len, delta, items) {
		// resulting distribution
		var cutoff = [];
		var cutsum = 0;

		// distribute the delta based on the proportion of
		// thumbnail size to length of all thumbnails.
		for(var i in items) {
			var item = items[i];
			var fractOfLen = item.twidth / len;
			cutoff[i] = Math.floor(fractOfLen * delta);
			cutsum += cutoff[i];
		}

		// still more pixel to distribute because of decimal
		// fractions that were omitted.
		var stillToCutOff = delta - cutsum;
		while(stillToCutOff > 0) {
			for(i in cutoff) {
				// distribute pixels evenly until done
				cutoff[i]++;
				stillToCutOff--;
				if (stillToCutOff == 0) break;
			}
		}
		return cutoff;
	};
	
	/**
	 * Takes images from the items array (removes them) as 
	 * long as they fit into a width of maxwidth pixels.
	 *
	 * @method buildImageRow
	 */
	var buildImageRow = function(maxwidth, items) {
		var row = [], len = 0;
		
		// each image a has a 3px margin, i.e. it takes 6px additional space
		var marginsOfImage = 0;

		// Build a row of images until longer than maxwidth
		while(items.length > 0 && len < maxwidth) {
			var item = items.shift();
			row.push(item);
			len += (item.twidth + marginsOfImage);
		}

		// calculate by how many pixels too long?
		var delta = len - maxwidth;

		// if the line is too long, make images smaller
		if(row.length > 0 && delta > 0) {

			// calculate the distribution to each image in the row
			var cutoff = calculateCutOff(len, delta, row);

			for(var i in row) {
				var pixelsToRemove = cutoff[i];
				item = row[i];

				// move the left border inwards by half the pixels
				item.vx = Math.floor(pixelsToRemove / 2);

				// shrink the width of the image by pixelsToRemove
				item.vwidth = item.twidth - pixelsToRemove;
			}
		} else {
			// all images fit in the row, set vx and vwidth
			for(var i in row) {
				item = row[i];
				item.vx = 0;
				item.vwidth = item.twidth;
			}
		}

		return row;
	};
	
	/**
	 * Creates a new thumbail in the image area. An attaches a fade in animation
	 * to the image. 
	 */
	var createImageElement = function(parent, item) {
		var imageContainer = $('<div class="imageContainer"/>');
		imageContainer.attr('data-shift',0);
		imageContainer.attr('data-opened',0);

		var overflow = $("<div/>");
		overflow.css("width", ""+$nz(item.vwidth, 120)+"px");
		overflow.css("height", ""+$nz(item.theight, 120)+"px");
		overflow.css("overflow", "hidden");

		var link = $('<a class="viewImageAction" href="#"/>');
		link.click(function() {
			console.log($(this).parent().parent().attr('data-opened'));
			if($(this).parent().parent().attr('data-opened') === '0'){ // i hate you javascript
				$('imageContainer').attr('data-opened',0); 
				openUp($(this));
			} else {
				closeDown($(this));
			}
			return false;
		});
		
		var img = $("<img/>");
		img.attr("class", "imageItself");
		img.attr("src", "gallery/thumbs/" + item.thumbUrl);
		img.attr("title", item.title);
		img.attr("alt", item.alt);
		img.attr("data-description", item.description);
		img.css("width", "" + $nz(item.twidth, 120) + "px");
		img.css("height", "" + $nz(item.theight, 120) + "px");
		img.css("margin-left", "" + (item.vx ? (-item.vx) : 0) + "px");
		img.css("margin-top", "" + 3 + "px");
		img.hide();

		link.append(img);
		overflow.append(link);
		imageContainer.append(overflow);

		// fade in the image after load
		img.bind("load", function () {
				$(this).show(0);
		});

		parent.find(".clearfix").before(imageContainer);
		item.el = imageContainer;
		return imageContainer;
	};
	
	/**
	 * Updates an exisiting tthumbnail in the image area. 
	 */
	var updateImageElement = function(item) {
		var overflow = item.el.find("div:first");
		var img = overflow.find("img:first");

		overflow.css("width", "" + $nz(item.vwidth, 120) + "px");
		overflow.css("height", "" + $nz(item.theight, 120) + "px");

		img.css("margin-left", "" + (item.vx ? (-item.vx) : 0) + "px");
		img.css("margin-top", "" + 3 + "px");
	};	
		
	/* ------------ PUBLIC functions ------------ */
	return {
		
		showImages : function(imageContainer, realItems) {

			// reduce width by 1px due to layout problem in IE
			var containerWidth = imageContainer.width() - 1;
			
			// // Make a copy of the array
			var items = realItems.slice();
		
			// calculate rows of images which each row fitting into
			// the specified windowWidth.
			var rows = [];
			var stop = 0;
			while(items.length > 0){
				console.log(items[0].width + " : " + containerWidth);
				// var row = [];
				// row.push(buildImageRow(containerWidth, items));
				// console.log(row.length);
				rows.push(buildImageRow(containerWidth, items));
				// stop = 1
			};


			for(var r in rows) {
				for(var i in rows[r]) {
					var item = rows[r][i];
					if(item.el) {
						// this image is already on the screen, update it
						updateImageElement(item);
					} else {
						// create this image
						createImageElement(imageContainer, item);
					}
				}
			}
		}

	}
})(jQuery);

function openUp(item){
	// $('.contentainer').remove();
	var parpar = item.parent().parent();
	var parparpar = item.parent().parent().parent();
	$(parpar).attr('data-opened',1);
	var contentainer = $('#'+$(parparpar).attr('id') + '_contentainer');
	$(contentainer).show(400).css("display", "inline-block");
	var newurl = $(item).children('.imageItself').attr('src').replace('/thumbs/','/previews/');
	$(contentainer).children('.contentainerImg').attr('src',newurl);
	// var rowTop = item.offset().top;
	// // console.log("FROM TOP " + $('#imagearea').children().length);
	// $('.imagearea').children().each(function(){
	// 	if($(this).attr('class') !== 'clearfix'){
	// 		if( $(this).offset().top > rowTop ){
	// 			if($(this).attr('data-shift') <= 0){
	// 				shiftTo($(this),$(this).offset().top,shiftUpSize);
	// 			}
	// 		} else {
	// 			if($(this).attr('data-shift') > 0){
	// 				shiftTo($(this),$(this).offset().top,0);
	// 			}
	// 		}
	// 	};
	// });

	if(parpar.attr('data-shift') <= 0){
	    $('html, body').animate({
	        scrollTop: (parpar.offset().top + (parpar.outerHeight()-140))
	    }, 200);
	} else {
	    $('html, body').animate({
	        scrollTop: (parpar.offset().top + (parpar.outerHeight()-140) - shiftUpSize)
	    }, 200);
	}

	// console.log(item.children().first().attr('data-description'));
}

function closeDown(item){
	var parpar = item.parent().parent();
	var parparpar = item.parent().parent().parent();
	$(parparpar.children()).attr('data-opened',0);
	$('#'+$(parparpar).attr('id') + '_contentainer').hide(400);

	var rowTop = item.offset().top;
	// console.log("FROM TOP " + $('#imagearea').children().length);
	$('.imagearea').children().each(function(){
		if($(this).attr('class') !== 'clearfix'){
			shiftTo($(this),$(this).offset().top,0);
		};
	});

	if(parpar.attr('data-shift') <= 0){
	    $('html, body').animate({
	        scrollTop: (parpar.offset().top + (parpar.outerHeight()-140))
	    }, 200);
	} else {
	    $('html, body').animate({
	        scrollTop: (parpar.offset().top + (parpar.outerHeight()-140) - shiftUpSize)
	    }, 200);
	}
	// console.log(item.children().first().attr('data-description'));

}

function shiftTo(item, start, shift){

	item.offset({top: start}).animate({ top: shift }, {
			    duration: 250,
			    step: function(now,fx) {
			    	item.offset({top: now});
			    	item.attr('data-shift',now);
			    },
			    complete: function(){
			    	// console.log('alright!@');
			    }
			});
}

$(document).ready(function() {
	$.getJSON('../gallery/images.json', function(data) {

		for ( var i = 0; i < data.thumbs.length; i++){
			$('#gallery').append('<div id="imagearea' + i + '" class="imagearea"><div class="clearfix"></div></div>');
		}

		$(".imagearea").width($('#body').outerWidth()*0.6);
		// $(".imagearea").height($('#body').outerHeight()*0.8);

		for ( var i = 0; i < data.thumbs.length; i++){
			var items = data.thumbs[i].images;
			GPlusGallery.showImages($("#imagearea"+i), items);
			var contentainer = $('<div id="imagearea'+i+'_contentainer" class="contentainer"></div>');
			contentainer.append('<img class="contentainerImg" height="' + (height*0.75-40) + '" src="../gallery/previews/' + data.thumbs[i].images[0].thumbUrl + '" >');
			contentainer.append('<div class="contentainerText"><p>(NL)</p><h1>' + data.thumbs[i].title + '</h1><p>' + data.thumbs[i].description + '</p><br><p>(EN)</p><h1>' + data.thumbs[i].title_en + '</h1><p>' + data.thumbs[i].description_en + '</p></div>');
			$("#imagearea"+i).append(contentainer);
		}
		$('.contentainer').show(0);
		$('.contentainer').height(height*0.75);
		$('.contentainer').width(width*0.6);
		$('.contentainer').hide(0);


		$(window).resize(function() {
			width = $(window).outerWidth();
			height = $(window).outerHeight();
			$('.contentainer').show(0);
			$('.contentainer').height(height*0.75);
			$('.contentainer').width(width*0.6);
			$('.contentainerImg').height(height*0.75-40);
			$('.contentainer').hide(0);

			shiftUpSize = height * 0.75;
			$(".imagearea").width(width*0.6);
			// layout the images with new width
			// GPlusGallery.showImages($("#imagearea"), items);

			for ( var i = 0; i < data.thumbs.length; i++){
				var items = data.thumbs[i].images;
				GPlusGallery.showImages($("#imagearea"+i), items);
			}
			resizeMenuType();
		});  
		
//	could be used for loading aditional images on scrolling
//		$(window).scroll(function() {
//			if  ($(window).scrollTop() + $(window).height() > $(document).height() - 200){
//				
//			}
//		});

	});
	resizeMenuType();
});

function resizeMenuType(){
    var menuFontsizeH = height*0.03 > 12 ? height*0.03 > 20 ? 20 : height*0.03 : 12;
    var menuFontsizeW = width*0.03 > 12 ? width*0.03 > 20 ? 20 : width*0.03 : 12;
    var menuFontsize = menuFontsizeH < menuFontsizeW ? menuFontsizeH : menuFontsizeW;
    $('.menuitem').css('fontSize',menuFontsize+'px');
}



