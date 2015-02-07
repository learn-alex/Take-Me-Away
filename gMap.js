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
    directionsDisplay = new google.maps.DirectionsRenderer();

	var mapOptions = {
		center: { lat: -34.397, lng: 150.644},
		zoom: 8
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
}

// function initialize() {
//   directionsDisplay = new google.maps.DirectionsRenderer();
//   var chicago = new google.maps.LatLng(41.850033, -87.6500523);
//   var mapOptions = {
//     zoom:7,
//     center: chicago
//   }
//   map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
//   directionsDisplay.setMap(map);
// }


function calcDest() {
    var curr = document.getElementById('start').value;
    var dest = document.getElementById('end').value; 

    var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });

}





google.maps.event.addDomListener(window, 'load', initialize);
    
