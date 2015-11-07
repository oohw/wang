<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="Wang Motorcycles">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Wang Motorcycles - Motor Reparatie en Onderhoud, Customizing Motors, BMW, Honda</title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/gallery.css">
        <link rel="author" href="Jakob Schlötter">
    </head>
    <body id="body">
        <script src="js/jquery-2.1.3.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="js/jquery.easing.1.3.js"></script>
        <script src="js/util.js"></script>

        <div id="gallery">
        </div>

        <div id="menu">       
	        <div id="menuas">
	        	<a href="index.php"><div id="menu_logo" class="menuitem" width="50" height="50"><img id="menu_logoimg" src="util/wm_logo2.svg" onerror="this.src='util/wm_logo_w.png'"></div></a>
				<div class="menuitem dropTheShadow" id="menuGallery"><a href="#">GALLERY</a></div>
				<div class="menuitem dropTheShadow" id="menuFacebook"><a target="_blank" href="https://www.facebook.com/wangmotorcycles/">FACEBOOK</a></div>
				<div class="menuitem dropTheShadow" id="menuInstagram"><a target="_blank" href="https://instagram.com/wangmotorcycles/">INSTAGRAM</a></div>
			</div>
		</div>

	   	<script type="text/javascript">  
            jQuery(document).ready(function() {
                /*
                 * Replace all SVG images with inline SVG
                 */
                    jQuery('img.svg').each(function(){
                        var $img = jQuery(this);
                        var imgID = $img.attr('id');
                        var imgClass = $img.attr('class');
                        var imgURL = $img.attr('src');
                
                        jQuery.get(imgURL, function(data) {
                            // Get the SVG tag, ignore the rest
                            var $svg = jQuery(data).find('svg');
                
                            // Add replaced image's ID to the new SVG
                            if(typeof imgID !== 'undefined') {
                                $svg = $svg.attr('id', imgID);
                            }
                            // Add replaced image's classes to the new SVG
                            if(typeof imgClass !== 'undefined') {
                                $svg = $svg.attr('class', imgClass+' replaced-svg');
                            }
                            
                            // Remove any invalid XML tags as per http://validator.w3.org
                            $svg = $svg.removeAttr('xmlns:a');
                            
                            // Replace image with new SVG
                            $img.replaceWith($svg);
                        });
    
                    });
            });
        </script>
        <div id="animator"></div>
        <script src="js/gallery.js"></script>
    </body>
</html>