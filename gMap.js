/*
 * Google Maps API
 * HopHacks Spring 2015
 *
 * street view directions
 */

function initialize() {
	var mapOptions = {
		center: { lat: -34.397, lng: 150.644},
		zoom: 8
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function calcDest() {
    var curr = document.getElementById('curr').value;
    var dest = document.getElementsById('dest').value; 

    console.log("curr:" + curr);
    console.log("dest:" + dest);
    
}





google.maps.event.addDomListener(window, 'load', initialize);
    
