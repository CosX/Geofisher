$(document).ready(function() {
     $.get('http://frigg.hiof.no/h13d23/Backend/session.php', function (data) {
      if(data === null){
        window.location.replace("index.html");
      } 
    });
});