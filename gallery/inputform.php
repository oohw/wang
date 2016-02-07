<!DOCTYPE html>
<html>
<head>
<title>WANGS BACKEND</title>
<link rel="stylesheet" href="../css/backend.css">
</head>
<body>
        <script src="../js/jquery-2.1.3.js"></script>
        <script src="../js/jquery-ui.js"></script>

<h1>/// Backend /// Authorized personnel only /// -> input form</h1>
<form id="form" action="upload.php" method="post" enctype="multipart/form-data">
    <p>want to upload images?</p>
    <p>project information please:</p>
    <input class="nl" type="text" name="title_nl" id="title_nl" placeholder="title_nl"><br>
    <textarea class="nl" name="description_nl" id="description_nl" rows="4" cols="50" placeholder="description_nl"></textarea><br>
    <input class="en" type="text" name="title_en" id="title_en" placeholder="title_en"><br>
    <textarea class="en" name="description_en" id="description_en" rows="4" cols="50" placeholder="description_en"></textarea><br>
    <hr>
    <div id="images">
    <p>drag and drop the images here:</p>
        <input id="drop-area" type="file" id="fileToUpload0" multiple="multiple" name="filesToUpload[]"><br>
    </div>
    <hr>
    <input type="submit" value="Upload everything" name="submit">
    <input type="reset" value="reset" name="reset">
</form>

<script>
    $("#drop-area").on('dragenter', function (e){
        // e.preventDefault();
        $(this).css('background', '#0f0');
    });

    $("#drop-area").on('dragleave', function (e){
        // e.preventDefault();
        $(this).css('background', '#ffffee');
    });

    $("#drop-area").on('dragover', function (e){
        // e.preventDefault();
    });
    $("#drop-area").on('drop', function (e){
        $(this).css('background', '#0f0');
        // e.preventDefault();
        var images = e.originalEvent.dataTransfer.files;
        for(var i = 0; i < images.length; i++){
            console.log(images[i].name);
        }
    });

imageindex = 0;
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
	$('.hidden').hide(0);
	$('#form').center(true,true);
	$('#more').click(function(){
		imageindex++;
		$('#images').append('<hr><p>image ' + (imageindex+1) + ':</p><input class="nl" type="text" name="imagetitle' + imageindex +'_nl" id="imagetitle' + imageindex +'_nl" placeholder="motor" value="Motor"><br>\n<input class="en" type="text" name="imagetitle' + imageindex +'_en" id="imagetitle' + imageindex +'_en" placeholder="motor" value="Motor"><br>\n<input type="file" name="fileToUpload' + imageindex +'" id="fileToUpload' + imageindex +'"><br>');
		$('#imageamount').attr("value",(imageindex+1));
	});


</script>

</body>
</html>