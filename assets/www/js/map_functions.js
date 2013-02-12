var map;
var myCenter=new google.maps.LatLng(51.508742,-0.120850);

        function detectBrowser() {
            var useragent = navigator.userAgent;
            var mapdiv = document.getElementById("map_canvas");

        if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
            mapdiv.style.width = '100%';
            mapdiv.style.height = '100%';
            } else {
                mapdiv.style.width = '600px';
                mapdiv.style.height = '800px';
            }
        }

        function initialize()
        {
            var mapProp = {
            center:myCenter,
            zoom:5,
            mapTypeId:google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

            google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(event.latLng);
            });
        }

        $(".add-menu").click(function(){
			var string = $("input.legg-sted").val();
			
			string = string.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    			return letter.toUpperCase();
			});
			
			if (!string == ""){
				$(".last").after("<li><a href=/" + string + ">" + string + "</a></li>");
			}
			//$('li:not(:last-child)').removeClass('last');
		})

            function placeMarker(location) {

                var marker = new google.maps.Marker({
                position: location,
                map: map,
	            icon: new google.maps.MarkerImage('http://frigg.hiof.no/h13d23/mapexample/url.png')
            });
            var infowindow = new google.maps.InfoWindow({
                content: 'Sted: ' + '<input type="text" class="legg-sted">' + '<br>Fortell om tur: ' + '<input type="textarea" class="legg-besk">' +'<button type="submit" class="add-menu">Trykk</button>'
            });
            infowindow.open(map,marker);
        }

google.maps.event.addDomListener(window, 'load', initialize);