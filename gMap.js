/*
 * Google Maps API
 * HopHacks Spring 2015
 *
 * street view directions
 */

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
    var myLatlng = new google.maps.LatLng(42.345573,-71.098326);

    directionsDisplay = new google.maps.DirectionsRenderer();
    
    var streetMap = myLatlng;
    var panoramaOptions = {
    	position: myLatlng,
    	pov: {
      	  heading: 34,
      	  pitch: 10
    	},
    	zoom: 1
    };

google.maps.event.addDomListener(window, 'load', initialize);
	var mapOptions = {
		center: myLatlng,
		zoom: 8
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);

 	var myPano = new google.maps.StreetViewPanorama(document.getElementById('street-canvas'),
      		panoramaOptions);
  	myPano.setVisible(true);

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Marker'
  });

    map.setStreetView(myPano);

}

function calcDest() {

    var start = document.getElementById('start').value;
    var end = document.getElementById('finish').value; 

    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    } else {
        window.alert("invalid loc");
    }
  });

}

var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

var myLatlng = new google.maps.LatLng(-25.363882,131.044922);

var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title:"Hello World!"
});

marker.setMap(map);

google.maps.event.addDomListener(window, 'load', initialize);
    
