var pictureSource;
var destinationType;

// Wait for Cordova to connect with the device
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready to be used
function onDeviceReady()
{
  pictureSource = navigator.camera.PictureSourceType;
  destinationType = navigator.camera.DestinationType;
}

// Called when a photo is successfully received
function onPhotoURISuccess(imageURI)
{
  var myImg = document.getElementById('myImg');
  myImg.style.display = 'block';
  myImg.src = imageURI;
  alert(imageURI);
}

// Called if something bad happens
function onFail(message)
{
  alert('Failed because: ' + message);
}

// Gets a photo from the library or album
function getPhoto()
{
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: destinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
}

// Uploads the image to S3
function upload()
{
  var myImg = document.getElementById('myImg');
  var options = new FileUploadOptions();
  options.fileKey = "image";
  options.fileName = "image" + Math.floor(Math.random()*100001) + ".jpg";
  options.mimeType = "image/jpeg";

  var params = new Object();
    params.title = $('#title').val();
    params.about = $('#about').val();
    params.rating = $('#rating').val();
    params.date = $('#date').val();
    params.share = $('.share:checked').val();
    params.lat = latitude;
    params.lon = longitude;
    options.params = params;
  
  if (myImg.src == ""){
    var Data = {title:  $('#title').val(), about:  $('#about').val(), rating: $('#rating').val(), date: $('#date').val(), share:  $('.share:checked').val(), lat: latitude, lon:  longitude };
    $.ajax({
      type: "POST",
      url: "http://frigg.hiof.no/h13d23/Backend/register-story.php",
      data: Data,
      success: onUploadSuccess,
      error: onUploadFail
    });
    return false;
  } else {
    var ft = new FileTransfer();
    ft.upload(myImg.src, encodeURI("http://frigg.hiof.no/h13d23/Backend/register-story.php"), onUploadSuccess, onUploadFail, options);
  }
}

// On upload success
function onUploadSuccess(r)
{
  window.location.replace("app.html");
}

// On upload fail
function onUploadFail(error)
{
  alert("Error uploading. Try again.");
}