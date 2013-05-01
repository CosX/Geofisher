// JavaScript Document
$(document).ready(function() {
    $(".logout").click(function(){
        $.ajax({
            url: "http://frigg.hiof.no/h13d23/Backend/logout.php"
        });
      window.location.replace("index.html");
    });
});