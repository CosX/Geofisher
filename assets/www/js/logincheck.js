/**
*
* Filnavn: login-check.js
* @author: GeoFisher
*
**/

//Hvis session ikke er aktiv vil appen returnere til login

$(document).ready(function() {
    $.get('http://frigg.hiof.no/h13d23/Backend/session.php', function (data) {
    	if(data === null){
        	window.location.replace("index.html");
    	} 
    });
});