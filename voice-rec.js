if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var start = function(start){
    console.log("Start: " + start)
    document.getElementById('start').value = start;

  }

  var end = function(end){
    console.log("End: " + end)
    document.getElementById('finish').value = end;

  }

  var go = function() {
    document.getElementById('submit').click();
    annyang.abort();

  }


var commands = {
    'start at *place': start,
    'go to *end': end,
    'take me away': go
  };

  annyang.addCommands(commands);
  annyang.start();
}