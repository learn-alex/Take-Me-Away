/*
 * Google Maps API
 * HopHacks Spring 2015
 *
 * street view directions
 */

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var myPanoLeft;
var myPanoRight;
var markerArray = [];
var stepDisplay;
var myLatlng;
var go = false;
var moveForward;

function initialize() {
    myLatlng = new google.maps.LatLng(34.12942,-118.775398);

    directionsDisplay = new google.maps.DirectionsRenderer();
    stepDisplay = new google.maps.InfoWindow();
    
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
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);

    var rendererOptions = {
        map: map
    }
    // directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

 	myPano = new google.maps.StreetViewPanorama(document.getElementById('street-canvas'),
      		panoramaOptions);
  	myPano.setVisible(true);

  //   var marker = new google.maps.Marker({
  //     position: myLatlng,
  //     map: map,
  //     title: 'Marker'
  // });

    // marker.setPosition(myLatlng);

    map.setStreetView(myPano);

}

function calcDest() {

    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }

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
      showSteps(result);
    } else {
        // window.alert("invalid loc");
    }
  });

  // setTimer();
  // moveForward = true;
  go = !go;

}

function showSteps(directionResult) {
    var myRoute = directionResult.routes[0].legs[0];

    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = new google.maps.Marker({
            position: myRoute.steps[i].start_location,
            map: map
        });

        var marker = new google.maps.Marker({
            position: myRoute.steps[i].start_location,
            size: 1000,
            map: myPano
        });
        attachInstructionText(marker, myRoute.steps[i].instructions);
        markerArray[i] = marker;
    }

}

function attachInstructionText(marker, text) {
    google.maps.event.addListener(marker, 'click', function() {
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
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
}

var interval; 
function setTimer() {
    if (go) {
        interval = setInterval(function(){ 
        // moveForward();
        }, 500);
        go = !go;
    } else {
        clearInterval(interval);
        go = !go;
    }


}

function rotate90() {
    // console.log(myPano);
    // var heading = myPano.getHeading();
    console.log("Pitch: " + myPano.getPov().heading);
    console.log("Yaw: " + myPano.getPov().pitch);

    var heading =  myPano.getPov().heading;
    // myPano.getPov().heading = heading + 20;
     myPano.setPov({
      heading: heading + 20,
      pitch: myPano.getPov().pitch
    });
    // (heading + 90);
}

var OculusBridge=function(a){var b,c=null,d=!0,e=a.hasOwnProperty("address")?a.address:"localhost",f=a.hasOwnProperty("port")?a.port:9005,g=a.hasOwnProperty("retryInterval")?a.retryInterval:1,h=a.hasOwnProperty("debug")?a.debug:!1,i={x:0,y:0,z:0,w:0},j={x:0,y:0,z:0},k={FOV:125.871,hScreenSize:.14976,vScreenSize:.0935,vScreenCenter:.04675,eyeToScreenDistance:.041,lensSeparationDistance:.067,interpupillaryDistance:.0675,hResolution:1280,vResolution:720,distortionK:[1,.22,.24,0],chromaAbParameter:[.996,-.004,1.014,0]},l={onOrientationUpdate:null,onAccelerationUpdate:null,onConfigUpdate:null,onConnect:null,onDisconnect:null};for(var m in l)"function"==typeof a[m]&&(l[m]=a[m]);var n=function(a){a.o&&4==a.o.length&&(i.x=Number(a.o[1]),i.y=Number(a.o[2]),i.z=Number(a.o[3]),i.w=Number(a.o[0]),l.onOrientationUpdate&&l.onOrientationUpdate(i))},o=function(a){a.a&&3==a.a.length&&(j.x=Number(a.a[0]),j.y=Number(a.a[1]),j.z=Number(a.a[2]),l.onAccelerationUpdate&&l.onAccelerationUpdate(j))},p=function(a){k.hScreenSize=a.screenSize[0],k.vScreenSize=a.screenSize[1],k.vScreenCenter=a.screenSize[1]/2,k.eyeToScreenDistance=a.eyeToScreen,k.lensSeparationDistance=a.lensDistance,k.interpupillaryDistance=a.interpupillaryDistance,k.hResolution=a.screenResolution[0],k.vResolution=a.screenResolution[1],k.distortionK=[a.distortion[0],a.distortion[1],a.distortion[2],a.distortion[3]],k.FOV=a.fov,l.onConfigUpdate&&l.onConfigUpdate(k)},q=function(){d=!0;var a="ws://"+e+":"+f+"/";b=new WebSocket(a),r("Attempting to connect: "+a),b.onopen=function(){r("Connected!"),l.onConnect&&l.onConnect()},b.onerror=function(){r("Socket error.")},b.onmessage=function(a){var b=JSON.parse(a.data),c=b.m;switch(c){case"config":p(b);break;case"orientation":n(b);break;case"update":n(b),o(b);break;default:r("Unknown message received from server: "+a.data),t()}},b.onclose=function(){l.onDisconnect&&l.onDisconnect(),d&&(r("Connection failed, retrying in 1 second..."),c=window.setTimeout(s,1e3*g))}},r=function(a){h&&console.log("OculusBridge: "+a)},s=function(){q()},t=function(){d=!1,window.clearTimeout(c),b.close()},u=function(){return k},v=function(){return i},w=function(){return 1==b.readyState};return{isConnected:w,disconnect:t,connect:q,getOrientation:v,getConfiguration:u}};

var bridge = new OculusBridge( {
    "onConnect" : function() { 
        console.log("we are connected!");
    },
    "onDisconnect" : function() {
        console.log("good bye Oculus.");
    },
    "onOrientationUpdate" : function(quatValues) {
        // giantSquid.quaternion.set(quatValues.x, quatValues.y, quatValues.z, quatValues.w);
        // console.log("X: " + 180*quatValues.x + "Y: " + 180*quatValues.y + "Z: " + 180*quatValues.z + "W: " + 180*quatValues.w);

        myPano.setPov({
          heading: -180*quatValues.y,
          pitch: 180*quatValues.x
        });
        // console.log("outside: " + go);
        // if(go) {
        //     console.log("moving forward");
        //     moveForward();
        // }
    }
});

bridge.connect();

function step() {
    setInterval(function() {
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
    }, 300);
}
google.maps.event.addDomListener(window, 'load', initialize);
    
