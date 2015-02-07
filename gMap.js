/*
 * Google Maps API
 * HopHacks Spring 2015
 *
 * street view directions
 */

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var myPano;

function initialize() {
    var myLatlng = new google.maps.LatLng(34.12942,-118.775398);

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

 	myPano = new google.maps.StreetViewPanorama(document.getElementById('street-canvas'),
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

  // moveForward();
  setTimer();

}

function difference(link) {
  return Math.abs(myPano.pov.heading%360 - link.heading);
}

function moveForward() {
  var curr;
  for(i=0; i < myPano.links.length; i++) {
    var differ = difference(myPano.links[i]);
    if(curr == undefined) {
      curr = myPano.links[i];
    }

    if(difference(curr) > difference(myPano.links[i])) {
      curr = curr = myPano.links[i];
    }
  }
  myPano.setPano(curr.pano);
  console.log("moving forward?");
}

function setTimer() {
    setInterval(function(){ 
        moveForward();
    }, 1000);

}

google.maps.event.addDomListener(window, 'load', initialize);
    
