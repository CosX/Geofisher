/**
*
* Filnavn: register-user.js
* @author: GeoFisher
*
**/

//Hele filen baserer seg på cordova sin filopplastning

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
}

// Called if something bad happens
function onFail(message)
{
  $('#notification').html("Man må laste opp bilde.");
}

// Gets a photo from the library or album
function getPhoto()
{
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: destinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
}

// Uploads the image to S3
function uploadPhoto()
{
  var myImg = document.getElementById('myImg');
  var options = new FileUploadOptions();
  options.fileKey = "image";
  options.fileName = "image" + Math.floor(Math.random()*100001) + ".jpg";
  options.mimeType = "image/jpeg";

  var params = new Object();
    params.username = $('#username').val();
    params.pw = $('#pw').val();
    params.email = $('#email').val();
    options.params = params;
  
  if (myImg.src === null){
    var Data = {username: $('#username').val(), pw: $('#pw').val(), email: $('#email').val()};
    $.ajax({
      type: "POST",
      url: "http://frigg.hiof.no/h13d23/Backend/createUser.php",
      data: Data,
      success: onUploadSuccess,
      error: onUploadFail
    });
    return false;
  } else {
    var ft = new FileTransfer();
    ft.upload(myImg.src, encodeURI("http://frigg.hiof.no/h13d23/Backend/createUser.php"), onUploadSuccess, onUploadFail, options);
    $('#notification').html("Uploading...");
  }
}

// On upload success
function onUploadSuccess(r)
{
  var obj = jQuery.parseJSON(r.response);
  $('#notification').html(obj.message);
}

// On upload fail
function onUploadFail(error)
{
  $('#notification').html("Error uploading. Add picture.");
}

