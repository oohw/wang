<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="Wang Motorcycles">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Wang Motorcycles</title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="author" href="Jakob Schlötter">
    </head>
    <body>
        <script src="js/jquery-2.1.3.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="js/jquery.easing.1.3.js"></script>
        <div id="slideshow"></div>
        <div id="contentainer"></div>
        <div id="menu">
        	<img id="menu_logo" width="141" class="menuitem" src="util/wm_logo_w.png">
        	<div id="menuas"></div>')
			<div class="menuitem"><a href="javascript:gallery()">GALLERY</a></div>
			<div class="menuitem"><a href="javascript:gallery()">KONTAKT</a></div>
			<div class="menuitem"><a href="javascript:gallery()">FACEBOOK</a></div>
			<div class="menuitem"><a href="javascript:gallery()">INSTAGRAM</a></div>
		</div>
        <div id="animator"></div>
        <script src="js/main.js"></script>
        <script>
        <?php
			date_default_timezone_set('Europe/Amsterdam');

			$imgpath = 'img/';
			$imgfiles = scandir($imgpath);
			$slideimages = Array();
			foreach ($imgfiles as $key => $value) {
				$extension = pathinfo($value, PATHINFO_EXTENSION);
				if( $extension !== 'png' && $extension !== 'jpg' ) continue;
				$slideimages[] = $value;
			}
			echo "loadSlideshow(" . str_replace("\"", "'",json_encode($slideimages)) . ");";



			// $projectsdata = Array();

			// foreach ($projects as $project) {
			//     if ($project === '.' or $project === '..') continue;
			//     if (is_dir($path . '/' . $project))
			// 		$projectsdata[] = collectThings($path,$project);
			// }


			// function collectThings($path,$project){
			//      // {
			// 		$json = file_get_contents($path . '/' . $project . '/' . 'content.json');

			// 		/* example json:
			// 		{
			// 		  "name":"uhuh",
			// 		  "text":"bitches\\nyeeeee",
			// 		  "videos":["https://vimeo.com/83897742","https://vimeo.com/83897742"]
			// 		}
			// 		*/

			// 		$content = json_decode($json, true);
			// 		$rawdate = preg_split("/[a-zA-Z\.\-\:]+/", $project);

			// 		$content['date'] = date('M j, Y', mktime($rawdate[3], $rawdate[4], $rawdate[5], $rawdate[1], $rawdate[2], $rawdate[0]));

			// 		$images = Array();
			// 		$files = scandir($path . '/' . $project . '/');

			// 		foreach ($files as $key => $value) {
			// 			$extension = pathinfo($path . '/' . $project . '/' . $value, PATHINFO_EXTENSION);
			// 			if( $extension !== 'png' ) continue;
			// 				$image = Array();
			// 				$image["src"] = $value;
			// 				$image["size"] = getimagesize($path . '/' . $project . '/' . $value);
			// 				$images[] = $image;
			// 		}
			// 		$content["images"] = $images;
			// 		$content["imageSizes"] = $images;
			// 		$content["folder"] = $project;
			// 		return $content;
			// }

			function println($string_message = '') {
			        return isset($_SERVER['SERVER_PROTOCOL']) ? print "$string_message" . PHP_EOL:
			          print $string_message . PHP_EOL;
			    }
        ?>
        </script>
    </body>
</html>