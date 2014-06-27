

$( document ).ready(function() {

	var sideColorNumbers = 4;				// #4 side-color
	var containerTextNumbers   = 2; // #2 container-text
	var containerNumbers = 2;// #2 containers
	var mouseInDict =  {"container1":0, "container2":0, "container-text1":0, "container-text2":0, "side-color1a":0, "side-color1b":0, "side-color2a":0, "side-color2b":0};
	var mouseEntryTime = $.now();
	
	var formatTimeOfDay = function(millisSinceEpoch) {
	  var secondsSinceEpoch = (millisSinceEpoch / 1000) | 0;
	  var secondsInDay = ((secondsSinceEpoch % 86400) + 86400) % 86400;
	  var seconds = secondsInDay % 60;
	  var minutes = ((secondsInDay / 60) | 0) % 60;
	  var hours = (secondsInDay / 3600) | 0;
	  return hours + (minutes < 10 ? ":0" : ":")
		  + minutes + (seconds < 10 ? ":0" : ":")
		  + seconds;
	};
	
	/*
	
	var idConstructor = function(baseID, numberOfID) {
	
		var numberIDPlusOne = numberOfID + 1;
	
		for (var i = 1; i < numberIDPlusOne; i++) {
		
			var idNumericalValue = i.toString();
			
			if (baseID === "side-color") {
			
				console.log('hit the switcer..');
				
				if (i === 1) {

					var idSub = idNumericalValue + 'a';
					
				}

				else if (i === 2) {
				
					var idSub = idNumericalValue + 'b';
					
				}
				
				else if ( i === 3 ) {
				
					var idSub = idNumericalValue + 'a';
					
				}
				
				else if ( i === 4 ) {
				
					var idSub = idNumericalValue + '2b';
				
				}
				
				else {
				
					alert('over run in the shitty code...');
					
				}
				
			}
				
			else {
			
				var idSub = baseID + idNumericalValue;
			
			
			}
			
			var idString = baseID + idSub;
			mouseInDict[ idString ] = 0;
	
		}
		
		console.log(mouseInDict);
		
	}
	
	idConstructor("container", 2);
	idConstructor("container-text", 2);
	idConstructor("side-color", 4);
	
	*/
	
	console.log(mouseInDict);
	
	window.mouseD = mouseInDict;
	
	
	$('.mouse-here').mouseenter( function() {
	
		mouseEntryTime = $.now();
		var currentId = $(this).attr('id');
		var totalTimeInArea = mouseInDict[ currentId ];
		var outPutString = 'Mouse arriving in: #' + currentId + "  Has been the area a total time: " + formatTimeOfDay(totalTimeInArea) + " s";
		console.log(outPutString);
		
	});
	
	$('.mouse-here').mouseleave( function() {
	
		var currentTime = $.now();
		var currentId = $(this).attr('id');
		var timeInArea = currentTime - mouseEntryTime;
		
		var totalTimeInArea = mouseInDict[ currentId ];
		var totalTimeInArea = totalTimeInArea + timeInArea;
		mouseInDict[ currentId ] = totalTimeInArea;
		
		var outPutString = 'Mouse leaving: #' + currentId + "  Has been the area a total time: " + formatTimeOfDay(totalTimeInArea) + " s";
		console.log(outPutString);
	
	});

});