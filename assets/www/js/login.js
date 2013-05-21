/**
*
* Filnavn: login.js
* @author: GeoFisher
*
**/

$( document ).bind( "mobileinit", function() {
	$.mobile.allowCrossDomainPages = true;
});

//Hvis kallet kommer igjennom
function onSuccess(data){
	var obj = jQuery.parseJSON(data);

    //Vil enten linke til app.html eller gi en tekst-string
    if (obj.message == '1'){
        window.location.replace("app.html");
    } else if(obj.message == '2') {
        $('#report').html(obj.input);
    }
    else{
    	$('#report').html("No response");
    }
}

function onError(data){
    $('#report').html("No internet!");
};
  
$(document).ready(function() {
    $("#submit").click(function(){
        var formData = $("#callAjaxForm").serialize();
        
        $.ajax({
            type:       "POST",
            url:        "http://frigg.hiof.no/h13d23/Backend/login.php",
            cache:      false,
            data:       formData,
            success:    onSuccess,
            error:      onError
        });
        
        return false;
    });
});