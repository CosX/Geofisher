// JavaScript Document
$( document ).bind( "mobileinit", function() {
// Make your jQuery Mobile framework configuration changes here!
	$.mobile.allowCrossDomainPages = true;
});
function onSucces(data, status){
    try {
      obj = jQuery.parseJSON(data);
 	} catch (e) {
      obj = 0;
 	}
 	
    if(!obj.message){
    	$("#search-friends").html("<li class='add-friend'>" + obj.username + "  <button class='make-friend' class='btn' type='submit'>Add user!</button></li>");
    } else {
    	$("#search-friends").html("Didn't find user");
    }
    friendId = obj.id;
}

function onSuc(data, status){
    obj = jQuery.parseJSON(data);
    alert(obj.message);
  }

function onError(data, status){
    alert(data);
}

var friendId;
$(document).ready(function() {
    $("#search-execute").click(function(){

      var Data = $("#friend-search").serialize();
  
        $.ajax({
            type: "POST",
            url: "http://frigg.hiof.no/h13d23/Backend/Friends/search-user.php",
            cache: false,
            data: Data,
            success: onSucces,
            error: onError
        });
  
        return false;
    });
    
    $("body").on("click", ".make-friend", function() {
      var Data = {otherUser: friendId};

      $.ajax({
        type: "POST",
        url: "http://frigg.hiof.no/h13d23/Backend/Friends/add-user.php",
        data: Data,
        success: onSuc,
        error: onError
      });
      return false;
    });
});