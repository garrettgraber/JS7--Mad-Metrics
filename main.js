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
		return "Percentage of the page viewed: " + percentViewed + ' %';
	};

	var timeOnPage = function() {
		var timeArray = timeChangeFunc(startTImeBase);
		var timeString = formatTimeOfDay( timeArray[ 0 ] );
		return 'Total time on the page: ' +  timeString + ' s';
	};

	var startUpLastPushed = function () {
		var timeArrayTemp = timeChangeFunc(startTime);
		var timeString = formatTimeOfDay( timeArrayTemp[ 0 ] );
		startTime = timeArrayTemp[ 1 ];
		return 'Total time since signup: ' +  timeString + ' s';
	}

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

	var populateIDs = function(tagName) {
	  	var idArray = [];
	  	var idCounter = Math.floor(Math.random()*20000) + 10000;
	  	
		fullTagObj = $(tagName).find('*');
		fullTagObj.each(function() {
		var id = $( this ).attr( "id" );

		if (id !== undefined) {
			if (typeof(id) === "string") {
				$(this).addClass('mouse-here');
				idArray.push(id);
			}
			else {
				console.log('what the hell');
			}
		}
		else {
			idUse = "zz" + idCounter.toString();
			$(this).attr("id", idUse);
			$(this).addClass('mouse-here');
			idArray.push(idUse);
			idCounter += 1;
		}
		});
		console.log("ID's tagged");
		return idArray;
	};

    var idValueStatus = function(id, tempstring) {

        var idArtificalStatus;
        var tempstring = tempstring + "    ;  Artifically created ID: ";

        (id.slice(0,2) === 'zz')? (idArtificalStatus = true): (idArtificalStatus = false);

        /*
        if (id.slice(0,2) === 'zz')?  {
            idArtificalStatus = true;
        }
        else {
            idArtificalStatus = false;    
        }
        */

        tempstring = tempstring + idArtificalStatus + "\n";
        var returnArray = [tempstring, idArtificalStatus];
        return returnArray;
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
			var tempString = "Area ID:  " + key + ";    Time in area: " + timeValue + " s";

            var outArray = idValueStatus( key, tempString );
            tempString = outArray[ 0 ];

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

	var distanceScrolled = function() {
		var windowHeight = $(window).height();
		var docHeight = $(document).height()
		var scrollHeightWin = $(window).scrollTop();
		var scrollHeightDoc = $(document).scrollTop();
		console.log('window height= ' + windowHeight);
		console.log('document height= ' + docHeight);
		console.log('scroll height window= ' + scrollHeightWin);
		console.log('scroll height document= ' + scrollHeightDoc);
		console.log('total amount scrolled in px= ' + totalScrollState);
		return "Total number of pixels scrolled: " + totalScrollState + ' px';
	};

	var appendHeadPara = function(tempJquery, runFunction) {
		var outString = runFunction();
		var tempHeading = $('<h2>');
		var tempParagraph = $('<p>');
		tempParagraph.addClass('mouse-text-section');
		tempParagraph.html(outString);
		tempHeading.appendTo( tempJquery );
		tempParagraph.appendTo( tempJquery );
		return tempJquery;
	};
	
	//find document ids and create a dictionary with them as the keys
	var idTotalArray = populateIDs('body');
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
    window.idStatus = idValueStatus;

	$('.fire-button').on('click', function() {
		alert('You have pressed one of the fire buttons, BEWARE!');

	});

	$('.mouse-here').mouseenter( function() {
	
		var mouseEntryTimeNow = $.now();

		var currentId = $(this).attr('id');
		var totalTimeInArea = mouseInDict[ currentId ];

		mouseEntryDict[ currentId ] = mouseEntryTimeNow;

		var outPutString = 'Mouse arriving in: #' + currentId + "  Has been the area a total time: " + formatTimeOfDay(totalTimeInArea) + " s";

        var outArray = idValueStatus( currentId, outPutString );
        outPutString = outArray[ 0 ];		

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
		
        var outArray = idValueStatus( currentId, outPutString );
        outPutString = outArray[ 0 ];

        console.log(outPutString);
	
	});

	$(window).on('scroll',function() {
		
		var currentScrollValue = $(window).scrollTop();
		var differenceScrollValue = Math.abs(currentScrollValue - scrollState);
		scrollState = currentScrollValue;
		totalScrollState = differenceScrollValue + totalScrollState;

	});

	$('#distance-scroll-button').click(function() {

		alert(distanceScrolled());

		/*
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
*/
	});

	$('#page-view-button').click(function() {
		alert(pageTotalViewed());
	});

	$('#sign-up-button').click(function() {
		alert(startUpLastPushed());
	});

	$('#time-on-page-button').click(function() {
		alert(timeOnPage());
	});

	$('#mouse-stats-button').click(function() {
		var outPutString = displayDict(mouseInDict);
		console.log(outPutString);
		alert(outPutString);
	});

	$('#mouse-info-button').click(function() {
		var tempJquery = $('<div>').attr('class', 'mouse-details-box');
		var tempButton = $('<button>');

		tempButton.addClass('mouse-dialog-button metric-button');
		tempButton.text('Exit');

		var tempHeading = $('<h2>');
		tempHeading.css({fontWeight:'bold', display:'inline'});
		tempHeading.text('Mouse movement statics');
		var outString = displayDict(mouseInDict);
		outString = outString.replace(/(?:\r\n|\r|\n)/g, '<br>');
		var tempParagraph = $('<p>');
		tempParagraph.addClass('mouse-text-section');
		tempParagraph.html(outString);
		tempHeading.appendTo( tempJquery );
        tempButton.appendTo( tempJquery );
		tempParagraph.appendTo( tempJquery );

		/*

		var distanceScroll = distanceScrolled();
		var outString = "Distance scrolled: " + distanceScroll + " px";
		var tempHeading2 = $('<h2>');
		var tempParagraph2 = $('<p>');
		tempParagraph2.addClass('mouse-text-section');
		tempParagraph2.html(outString);

		var outString = pageTotalViewed();
		var tempHeading3 = $('<h2>');
		var tempParagraph3 = $('<p>');
		tempParagraph3.addClass('mouse-text-section');
		tempParagraph3.html(outString);

		var outString = timeOnPage();
		var tempHeading4 = $('<h2>');
		var tempParagraph4 = $('<p>');
		tempParagraph4.addClass('mouse-text-section');
		tempParagraph4.html(outString);

		var outString = startUpLastPushed();
		var tempHeading5 = $('<h2>');
		var tempParagraph5 = $('<p>');
		tempParagraph5.addClass('mouse-text-section');
		tempParagraph5.html(outString);

		tempHeading.appendTo( tempJquery );
		tempParagraph.appendTo( tempJquery );
		tempButton.appendTo( tempJquery );
		tempHeading2.appendTo( tempJquery );
		tempParagraph2.appendTo( tempJquery );
		tempHeading3.appendTo( tempJquery );
		tempParagraph3.appendTo( tempJquery );
		tempHeading4.appendTo( tempJquery );
		tempParagraph4.appendTo( tempJquery );
		tempHeading5.appendTo( tempJquery );
		tempParagraph5.appendTo( tempJquery );

		*/

		tempJquery = appendHeadPara(tempJquery, distanceScrolled);
		tempJquery = appendHeadPara(tempJquery, pageTotalViewed);
		tempJquery = appendHeadPara(tempJquery, timeOnPage);
		tempJquery = appendHeadPara(tempJquery, startUpLastPushed);

		tempJquery.prependTo('#main-container');

	});

	$(document).on('click', '.mouse-dialog-button', function() {
		$('.mouse-details-box').remove();
	});

});
