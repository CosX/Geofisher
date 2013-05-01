// JavaScript Document

$(document).ready(function() {
    $.post("http://frigg.hiof.no/h13d23/Backend/Friends/show-friends.php", 
    { 
      cache: false
    }, 
    function(data){ 
      $('#num-friends').html('You have '+ data.length +' friends');
      for(n in data) {
          $('#my-friends').append('<li><a href="#"><h1 class="someuser">' + data[n].username + '</h1><img src="http://frigg.hiof.no/h13d23/Backend/'+ data[n].image +'"/></a></li>');
      }
    },'json'
  );
});