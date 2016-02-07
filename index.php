<!DOCTYPE HTML>
<?php
	// prepare image.json 
	date_default_timezone_set('Europe/Amsterdam');

	// $imgpath = 'gallery/img';
	// $imgfiles = scandir($imgpath);
	// $galleryimages = Array();
	// $i = 0;
	// foreach ($imgfiles as $key => $value) {
	// 	$extension = pathinfo($value, PATHINFO_EXTENSION);
	// 	if( $extension == 'png' || $extension == 'jpg' ) {
	// 		$galleryimage = Array();
	// 		$galleryimage["thumbUrl"]=$value;
	// 	    $galleryimage["title"]="this is a title";
	// 	    $galleryimage["theight"]=120;
	// 	    $galleryimage["description"]="first image ever";
	// 	    $galleryimage["author"]="ME";
	// 	    $galleryimage["name"]=$value;
	// 	    $galleryimage["twidth"]=120 * getimagesize($imgpath.'/'.$value)[1] / getimagesize($imgpath.'/'.$value)[0];
	// 	    $galleryimage["alt"]="yo";
	// 		$galleryimages[] = $galleryimage;
	// 		// $imagick = new Imagick(realpath($imgpath.'/'.$value));

	// 	} else if( $extension == 'json' ) {

	// 	}

	// }
	// $thumbs = Array();
	// $thumbs["thumbs"] = $galleryimages;
	// file_put_contents('gallery/images.json', json_encode($thumbs));



?>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Language" content="en,nl">
        <meta name="description" content="Wang Motorcycles verzorgt onderhoud, reparatie, restauratie en clean customising aan BMW, Harley, Honda, Yamaha, Suzuki, Kawasaki, Buell, Triumph, BSA en nog veel meer motors in Den Haag.">
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
        <script src="js/flowtype.js"></script>

        <div id="slideshow">
        <?php
			date_default_timezone_set('Europe/Amsterdam');

			$imgpath = 'img/';
			$imgfiles = scandir($imgpath);
			$slideimages = Array();
			$i = 0;
			foreach ($imgfiles as $key => $value) {
				$extension = pathinfo($value, PATHINFO_EXTENSION);
				if( $extension !== 'png' && $extension !== 'jpg' ) continue;
				$slideimages[] = $value;
				println('<img class="slideshowImage" id="slideShowImage' . $i . '" src="img/'.$value.'">');
				$i++;
			}
				println('<img class="slideshowImage" id="slideShowImage' . $i . '" src="img/'.$slideimages[0].'">');

			function println($string_message = '') {
			        return isset($_SERVER['SERVER_PROTOCOL']) ? print "$string_message" . PHP_EOL:
			          print $string_message . PHP_EOL;
			    }
        ?></div>
       
        <div id="menu">
	        <a href="#"><div id="menu_logo" class="menuitem" width="50" height="50"><img id="menu_logoimg" src="util/wm_logo2.svg" onerror="this.src='util/wm_logo_w.png'"></div></a>
	        <div id="menuas">
				<div class="menuitem dropTheShadow" id="menuGallery"><a href="gallery.php">GALLERY</a></div>
				<div class="menuitem dropTheShadow" id="menuFacebook"><a target="_blank" href="https://www.facebook.com/wangmotorcycles/">FACEBOOK</a></div>
				<div class="menuitem dropTheShadow" id="menuInstagram"><a target="_blank" href="https://instagram.com/wangmotorcycles/">INSTAGRAM</a></div>
			</div>
		</div>

        <div id="content">
        	<!-- <h1>Wang Motorcycles</h1> -->
            <div class="content_text">
                <p lang="nl" class="nl">(nl)<br>reparatie, onderhoud, restauratie <nobr>en ombouw</nobr> van motorfietsen.</p><p>Voor ouderwets vakmanschap <nobr>en prijzen.</nobr></p><p>En niet geheel onbelangrijk: <nobr>de beste koffie!</nobr></p>
            </div>
            <div class="content_text">
                <p lang="en" class="en">(en)<br>repair, maintenance, restauration <nobr>and customizing</nobr> of motorbikes.</p><p>For oldfashioned craftsmanship <nobr>and prices.</nobr></p><p>And not unimportant: <nobr>the best coffee!</nobr></p>
            </div>
            <div class="content_text">
                                <p class="contact">contact<br>
                                <b>Wang Motorcycles</b><br>
                                Pastoorswarande 50<br>
                                2513 TZ Den Haag<br>
                                The Netherlands<br><br>
                                +31 (0) 617 458 725<br>
                                <span id="email" style="height:1em;background-color:rgba(255, 255, 255, 0.1);cursor:text">e-mail</span><br>
                                <iframe id="contactMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2452.0854852538905!2d4.301140715626219!3d52.07817367973293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b726af3810a9%3A0x292adbabb9d4ab99!2sWang+Motorcycles!5e0!3m2!1sen!2snl!4v1454858113132" width="400" height="350" frameborder="0" style="border:0" allowfullscreen></iframe>                </p>
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
        <script src="js/main.js"></script>
    </body>
</html>