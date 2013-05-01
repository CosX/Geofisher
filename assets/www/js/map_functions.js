// JavaScript Document

var longitude;
var latitude;

var map;
var infoWindow = new google.maps.InfoWindow;
var myCenter = new google.maps.LatLng(51.508742,-0.120850);
var markerArray = [];
var mapProp = {
    zoom: 6,
    center: myCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };


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

//Longpress function (thanks to Richard and Leiko on stackoverflow)
function LongPress(map, length) {
    this.length_ = length;
    var me = this;
    me.map_ = map;
    me.timeoutId_ = null;
    google.maps.event.addListener(map, 'mousedown', function(e) {
        me.onMouseDown_(e);
    });
    google.maps.event.addListener(map, 'mouseup', function(e) {
        me.onMouseUp_(e);
    });
    google.maps.event.addListener(map, 'drag', function(e) {
    me.onMapDrag_(e);
    });
};

LongPress.prototype.onMouseUp_ = function(e) {
    clearTimeout(this.timeoutId_);
};

LongPress.prototype.onMouseDown_ = function(e) {
    clearTimeout(this.timeoutId_);
    var map = this.map_;
    var event = e;
    this.timeoutId_ = setTimeout(function() {
    google.maps.event.trigger(map, 'longpress', event);
    }, this.length_);
};

LongPress.prototype.onMapDrag_ = function(e) {
    clearTimeout(this.timeoutId_);
};

$(document).ready(function() {
    $(".get-gps").click(function(){
      navigator.geolocation.getCurrentPosition(success);
    });

    setTimeout(function(){
      $(".push-message").fadeOut("slow", function () {
        $(".push-message").remove();
      });
    }, 4000);
});

function success(position) {

  myCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var marker = new google.maps.Marker({
      position: myCenter,
      map: map,
      icon:"https://www.cpmhealthgrades.com/CPM/includes/display_objects/custom/prms-calculator/img/blue_circle.png"  
    });
  map.setZoom(12);
  map.panTo(myCenter);
}

function initialize()
{
  detectBrowser();
  map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  
  var weatherLayer = new google.maps.weather.WeatherLayer({
    temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
  });
  weatherLayer.setMap(map);
  new LongPress(map, 800);
    google.maps.event.addListener(map, 'longpress', function(event) {
        longitude = event.latLng.lng();
      	latitude = event.latLng.lat();
      	
        //stuff that happens on map longpress goes here
        placeMarker(event.latLng);
        $.mobile.changePage('#log_form');
    });
    

    // Change this depending on the name of your PHP file
    $.get("http://frigg.hiof.no/h13d23/Backend/listStory/generateJSON.php", function(data){
        for(n in data) {
            var title = data[n].Title;
            var user = data[n].User;
            var about = data[n].About;
            var rating = data[n].Rating;
            var date = data[n].Date;
            var picture = data[n].Picture;
            var point = new google.maps.LatLng(
                parseFloat(data[n].lat),
                parseFloat(data[n].lng)
            );
            var html = "<h3>" + title + "</h3>" + "By: " + user + "<br/> <img width='200' src='http://frigg.hiof.no/h13d23/Backend/" + picture + "' /><br/>" + about + " <br/> Rating: " + rating + " <br/> <i>" + date + "</i>";
            var marker = new google.maps.Marker({
                map: map,
                position: point
            });
            
            bindInfoWindow(marker, map, infoWindow, html);
        }
    },'json'
);
    $.get("http://frigg.hiof.no/h13d23/Backend/listStory/generateJSONfriends.php", function(data){ 
      for(n in data) {
          var title = data[n].Title;
          var user = data[n].User;
          var about = data[n].About;
          var rating = data[n].Rating;
          var date = data[n].Date;
          var picture = data[n].Picture;
          var point = new google.maps.LatLng(
            parseFloat(data[n].lat),
            parseFloat(data[n].lng)
          );
          var html = "<h3>" + title + "</h3>" + "By: " + user + "<br/> <img width='200' src='http://frigg.hiof.no/h13d23/Backend/" + picture + "' /><br/>" + about + " <br/> Rating: " + rating + " <br/> <i>" + date + "</i>";
          var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: "http://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/32/Map-Marker-Marker-Outside-Azure.png"
          });
          bindInfoWindow(marker, map, infoWindow, html);
      }
    },'json'
  );
    
    $.get("http://frigg.hiof.no/h13d23/Backend/listStory/generateJSONpublic.php", function(data){ 
      for(n in data) {
          var title = data[n].Title;
          var user = data[n].User;
          var about = data[n].About;
          var rating = data[n].Rating;
          var date = data[n].Date;
          var picture = data[n].Picture;
          var point = new google.maps.LatLng(
            parseFloat(data[n].lat),
            parseFloat(data[n].lng)
          );
          var html = "<h3>" + title + "</h3>" + "By: " + user + "<br/> <img width='200' src='http://frigg.hiof.no/h13d23/Backend/" + picture + "' /><br/>" + about + " <br/> Rating: " + rating + " <br/> <i>" + date + "</i> - Public marker";
          var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: "http://maps.google.com/mapfiles/ms/micons/pink-dot.png"
          });
          bindInfoWindow(marker, map, infoWindow, html);
      }
    },'json'
  );
  	}
  	function bindInfoWindow(marker, map, infoWindow, html) {
      	google.maps.event.addListener(marker, 'click', function() {
        	infoWindow.setContent(html);
        	infoWindow.open(map, marker);
      	});
    }

  	function placeMarker(location) {

    	var marker = new google.maps.Marker({
      		position: location,
      		map: map
    	});
    	markerArray.push(marker);
    	var infowindow = new google.maps.InfoWindow({
    });
	infowindow.open(map,marker);
}

//Deletes last marker added if cancel is clicked in the "add comment" form
function cancelMarker(){
    markerArray[markerArray.length-1].setMap(null);
};

google.maps.event.addDomListener(window, 'load', initialize);