// JavaScript Document
$( document ).bind( "mobileinit", function() {
// Make your jQuery Mobile framework configuration changes here!
	$.mobile.allowCrossDomainPages = true;
});

function onSuccess(data){
	var obj = jQuery.parseJSON(data);

    if (obj.message == '1'){
        window.location.replace("app.html");
    } else if(obj.message == '2') {
        $('#report').html(obj.input);
    }
    else{
    	$('#report').html("No response");
    }
}
  
function onError(data)
{
   	// handle an error
}        
  
$(document).ready(function() {
    $("#submit").click(function(){
        var formData = $("#callAjaxForm").serialize();
        
        $.ajax({
            type: "POST",
            url: "http://frigg.hiof.no/h13d23/Backend/login.php",
            cache: false,
            data: formData,
            success: onSuccess,
            error: onError
        });
        
        return false;
    });
});