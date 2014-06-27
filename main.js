$(document).on('ready', function() {

	//global variable
	var startTime = $.now();
	var scrollState = 0;
	var totalScrollState = 0;
	var startTImeBase = startTime;

	var pageTotalViewed = function() {
		var totalPageHeight = $(document).height();
		var windowHeight = $(window).height();
		var windowScroll = $(window).scrollTop();
		var totalUserView = windowHeight + windowScroll;
		var percentViewed = ( totalUserView / totalPageHeight ) * 100.0;
		var percentViewedRound = percentViewed.toFixed(2);
		alert("Percentage of the page viewed: " + percentViewed + ' %');
	};

	var findIDs = function(tagName) {
	  	var idArray = [];
		fullTagObj = $(tagName).find('*');
		fullTagObj.each(function() {
			var id = $( this ).attr( "id" );
			if (typeof(id) === "string") {
				idArray.push(id);
			}
		});
		return idArray;
	};

	
	var createDictWithKeys = function(inList, initialValue) {
		var tempDict = {};
		for ( var i = 0; i < inList.length; i++ ) {
			var idString = inList[ i ];
			tempDict[ idString ] = initialValue;
		}
		return tempDict;
	};

	var displayDict = function(inDict) {
		var outString = '';

		for (var key in inDict) {
			var timeValue = inDict[ key ];
			timeValue = formatTimeOfDay(timeValue);
			var tempString = "Area: " + key + ";  Time in area: " + timeValue + " s\n";
			outString = outString + tempString;
		}
		return outString;
	};

	var timeChangeFunc = function(timeTest) {

		var currentTime = $.now();
		var differenceTime = currentTime - timeTest;
		return [differenceTime, currentTime]
		
	};

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
	
	//find document ids and create a dictionary with them as the keys
	var idTotalArray = findIDs('body');
	var mouseInDict = createDictWithKeys(idTotalArray, 0);
	var mouseEntryDict = createDictWithKeys(idTotalArray, 0);
	var mouseDictDispaly = displayDict(mouseInDict);

	console.log(idTotalArray);
	console.log(mouseInDict);
	console.log(mouseDictDispaly);

	window.ids = idTotalArray;
	window.mouseD = mouseInDict;
	window.mouseDis = displayDict;
	window.formatTime = formatTimeOfDay;

	$('.fire-button').on('click', function() {
		alert('You have pressed one of the fire buttons, BEWARE!');

	});

	$('.mouse-here').mouseenter( function() {
	
		var mouseEntryTimeNow = $.now();

		var currentId = $(this).attr('id');
		var totalTimeInArea = mouseInDict[ currentId ];

		mouseEntryDict[ currentId ] = mouseEntryTimeNow;

		var outPutString = 'Mouse arriving in: #' + currentId + "  Has been the area a total time: " + formatTimeOfDay(totalTimeInArea) + " s";
		console.log(outPutString);
		
	});
	
	$('.mouse-here').mouseleave( function() {
	
		var currentTime = $.now();
		var currentId = $(this).attr('id');
		var mouseEntryTimeNow = mouseEntryDict[ currentId ];
		var timeInArea = currentTime - mouseEntryTimeNow;
		
		var totalTimeInArea = mouseInDict[ currentId ];
		var totalTimeInArea = totalTimeInArea + timeInArea;
		mouseInDict[ currentId ] = totalTimeInArea;
		
		var outPutString = 'Mouse leaving: #' + currentId + "  Has been the area a total time: " + formatTimeOfDay(totalTimeInArea) + " s";
		console.log(outPutString);
	
	});

	$(window).on('scroll',function() {
		
		var currentScrollValue = $(window).scrollTop();
		var differenceScrollValue = Math.abs(currentScrollValue - scrollState);
		scrollState = currentScrollValue;
		totalScrollState = differenceScrollValue + totalScrollState;
		console.log('Let me ride...');

	});

	$('#distance-scroll-button').click(function() {

		var windowHeight = $(window).height();
		var docHeight = $(document).height()
		var scrollHeightWin = $(window).scrollTop();
		var scrollHeightDoc = $(document).scrollTop();
		console.log('window height= ' + windowHeight);
		console.log('document height= ' + docHeight);
		console.log('scroll height window= ' + scrollHeightWin);
		console.log('scroll height document= ' + scrollHeightDoc);
		console.log('total amount scrolled in px= ' + totalScrollState);
		alert('total amount scrolled in pixels: ' + totalScrollState + 'px');

	});

	$('#page-view-button').on('click', pageTotalViewed );

	$('#sign-up-button').click(function() {

		var timeArrayTemp = timeChangeFunc(startTime);
		var timeString = formatTimeOfDay( timeArrayTemp[ 0 ] );
		alert('Total Milliseconds since signup: ' +  timeString + ' s');
		startTime = timeArrayTemp[ 1 ];
		
	});

	$('#time-on-page-button').click(function() {
		
		var timeArray = timeChangeFunc(startTImeBase);
		var timeString = formatTimeOfDay( timeArray[ 0 ] );
		alert('Total Milliseconds since page open: ' + timeString + ' s');
		
	});

	$('#mouse-stats-button').click(function() {

		var outString = displayDict(mouseInDict);
		console.log(outString);
		alert(outString);

	});

	$('#mouse-info-button').click(function() {
		alert('Mouse stuff');
		var tempJquery = $('<div>').attr('class', 'mouse-details-box');
		var tempButton = $('<button>');
		tempButton.addClass('mouse-dialog-button metric-button');
		tempButton.text('Exit');
		var outString = displayDict(mouseInDict);
		outString = outString.replace(/(?:\r\n|\r|\n)/g, '<br>');
		tempParagraph = $('<p>');
		tempParagraph.html(outString);
		tempParagraph.appendTo( tempJquery );
		tempButton.appendTo( tempJquery );
		tempJquery.prependTo('#main-container');
	});

	$(document).on('click', '.mouse-dialog-button', function() {
		$('.mouse-details-box').remove();
	});

});