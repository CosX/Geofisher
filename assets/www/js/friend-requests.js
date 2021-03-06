
/**
*
* Filnavn: friend-requests.js
* @author: GeoFisher
*
**/


$( document ).bind( "mobileinit", function() {
  $.mobile.allowCrossDomainPages = true;
});

//Hvis kallet kommer igjennom
function onSuc(data, status){
  obj = jQuery.parseJSON(data);
  alert(obj.message);
  window.location.replace("app.html");
}

//Hvis kallet feiler
function onError(data, status){
  alert(data);
}

$(document).ready(function() {
  //Sender kallet til serveren
  $.post("http://frigg.hiof.no/h13d23/Backend/Friends/show-requests.php", 
  { 
    cache: false
  }, 
  function(data){ 
    $('#friend-requests').html('<br/><br/>You have '+ data.length +' friend requests');
  	for(n in data) {
      
      //Lister ut og gir events
      $('#friend-requests').append("<li class='request'><div class='requestedId'>" + data[n].username + "  <button class='acceptUser' value='"+ data[n].id +"' class='btn' type='submit'>Accept</button><button class='removeUser' value='"+ data[n].id +"' class='btn' type='submit'>Remove </button></div></li>");    
      $('.acceptUser').click(function(){
        var Data = {otherUser:  $(this).val()};
        $.ajax({
          type:   "POST",
          url:    "http://frigg.hiof.no/h13d23/Backend/Friends/accepted.php",
          data:    Data,
          success: onSuc,
          error:   onError
        });
        return false;
        $(this).parent().remove();
      });

      $('.removeUser').click(function(){
        var Data = {otherUser:  $(this).val()};
        $.ajax({
          type:     "POST",
          url:      "http://frigg.hiof.no/h13d23/Backend/Friends/removeRequests.php",
          data:     Data,
          success:  onSuc,
          error:    onError
        });

        return false;
        $(this).parent().remove();
      });
    }
  },'json' );
});