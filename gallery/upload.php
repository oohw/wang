<!DOCTYPE html>
<html>
<head>
<title>WANGS BACKEND</title>
<link rel="stylesheet" href="../css/backend.css">
<style type="text/css">
#uploadbody {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    background-color: #ffffee;
    opacity: 0.5;
    z-index: 1;
}
#content {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 10;
}
</style>
</head>
<body>
        <script src="../js/jquery-2.1.3.js"></script>
        <script src="../js/jquery-ui.js"></script>
<div id="content">
<h1>/// Backend /// Authorized personnel only /// -> image upload</h1>
<?php

echo "project " . $_POST["title_nl"] . ':<br>';

$amountimages = intval($_POST["imageamount"]);

echo "amount images: " . $amountimages;

$thumbs = json_decode(file_get_contents("test.json"),true);
$totalindex = sizeof($thumbs["thumbs"]);

$galleryimages = array();
$galleryimages["index"] = $totalindex;
$galleryimages["title"] = $_POST["title_nl"];
$galleryimages["title_en"] = $_POST["title_en"];
$galleryimages["description"] = $_POST["description_nl"];
$galleryimages["description_en"] = $_POST["description_en"];

$uploadTotalOk = 1;

for($index = 0; $index < $amountimages; $index++){
    $galleryimages["images"][] = uploadImageEtc($index);
}

$thumbs["thumbs"][] = $galleryimages;

$options = array('ftp' => array('overwrite' => true)); 
$stream = stream_context_create($options); 
file_put_contents("test.json",json_encode($thumbs));
echo "</div>";
if($uploadTotalOk == 1){
    echo '<div style="background-image: url(\'../util/thumbs' . rand(0,8) . '.png\');" id="uploadbody"></div>';
}

function uploadImageEtc($index) {
    global $uploadTotalOk;
    $target_dir = "img/";
    $prefix = $_POST["title_nl"] . "_";
    $target_file = $target_dir . $prefix . basename($_FILES["fileToUpload" . $index]["name"]);
    $uploadOk = 1;
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
    // Check if image file is a actual image or fake image
    if(isset($_POST["submit"])) {
        echo "checking " . $_FILES["fileToUpload" . $index]["tmp_name"];
        $check = getimagesize($_FILES["fileToUpload" . $index]["tmp_name"]);
        if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".<br>";
            $uploadOk = 1;
        } else {
            echo "<h2>File is not an image.<br>Maybe it is also just too big. Try with an image up to 1MB.</h2>";
            $uploadOk = 0;
        }
    }
    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.<br>";
        $uploadOk = 0;
    }
    // Check file size
    // if ($_FILES["fileToUpload" . $index]["size"] > 50000000) {
    //     echo "Sorry, your file is too large.<br>";
    //     $uploadOk = 0;
    // }
    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png"){
        echo "Sorry, only JPG & PNG files are allowed.<br>";
        $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.<br>";
    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["fileToUpload" . $index]["tmp_name"], $target_file)) {
            echo "The file ". basename( $_FILES["fileToUpload" . $index]["name"]). " has been uploaded.<br>";
        } else {
            echo "Sorry, there was an error uploading your file.<br>";
            $uploadOk = 0;
        }
    }
    if($uploadOk == 0){
        $uploadTotalOk = 0;
    }
    echo "</p>";
    $imgpath = 'img';
    $thumbspath = 'thumbs';
    $galleryimages = array();
    $value = $prefix . $_FILES["fileToUpload" . $index]["name"];
    $extension = pathinfo($value, PATHINFO_EXTENSION);
    if( $extension == 'png' || $extension == 'jpg' ) {
        $iheight = 250;
        $iwidth = 250 * getimagesize($imgpath.'/'.$value)[1] / getimagesize($imgpath.'/'.$value)[0];
        $asjpg = basename($value, ".".$extension) . ".jpg";
        $galleryimage = array();
        $galleryimage["thumbUrl"]=$asjpg;
        $galleryimage["title"]=$_POST["imagetitle" . $index . "_nl"];
        $galleryimage["title_en"]=$_POST["imagetitle" . $index . "_en"];
        $galleryimage["theight"]=$iheight;
        $galleryimage["author"]="Wang";
        $galleryimage["name"]=$value;
        $galleryimage["twidth"]=$iwidth;
        $galleryimage["alt"]=$_POST["imagetitle" . $index . "_nl"];
        $imagick = new Imagick();
        $imagick->readImage($imgpath.'/'.$value);
        $imagick->resizeImage($iwidth,$iheight,Imagick::FILTER_LANCZOS,1);
        $imagick->setImageDepth(8);
        $imagick->setImageFormat('jpeg');
        $imagick->setImageCompressionQuality(0);
        $imagick->writeImage($thumbspath.'/'.$asjpg);
        $imagick->readImage($imgpath.'/'.$value);
        $imagick->resizeImage($iwidth*4,$iheight*4,Imagick::FILTER_LANCZOS,1);
        $imagick->setImageDepth(8);
        $imagick->setImageFormat('jpeg');
        $imagick->setImageCompressionQuality(0);
        $imagick->writeImage('previews/'.basename($value, ".".$extension) . ".jpg");

        echo 'uploaded image ' . $_POST["imagetitle" . $index . "_nl"] .  '<br><img src="previews/' . basename($value, ".".$extension) . ".jpg" . '"><br>';

        return $galleryimage;
    }
    return false;
}

// Returns a file size limit in bytes based on the PHP upload_max_filesize
// and post_max_size
function file_upload_max_size() {
  static $max_size = -1;

  if ($max_size < 0) {
    // Start with post_max_size.
    $max_size = parse_size(ini_get('post_max_size'));

    // If upload_max_size is less, then reduce. Except if upload_max_size is
    // zero, which indicates no limit.
    $upload_max = parse_size(ini_get('upload_max_filesize'));
    if ($upload_max > 0 && $upload_max < $max_size) {
      $max_size = $upload_max;
    }
  }
  return $max_size;
}

function parse_size($size) {
  $unit = preg_replace('/[^bkmgtpezy]/i', '', $size); // Remove the non-unit characters from the size.
  $size = preg_replace('/[^0-9\.]/', '', $size); // Remove the non-numeric characters from the size.
  if ($unit) {
    // Find the position of the unit in the ordered string which is the power of magnitude to multiply a kilobyte by.
    return round($size * pow(1024, stripos('bkmgtpezy', $unit[0])));
  }
  else {
    return round($size);
  }
}
?>
</body>
</html>