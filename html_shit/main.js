
$( document ).ready(function() {

console.log('Main.js is talking...');
var scrollState = 0;
var totalScrollState = 0;
var startTime = $.now();
var startTImeBase = startTime;


$('#scroll-button').click(function() {

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


$(window).on('scroll',function() {
	
	var currentScrollValue = $(window).scrollTop();
	var differenceScrollValue = Math.abs(currentScrollValue - scrollState);
	scrollState = currentScrollValue;
	totalScrollState = differenceScrollValue + totalScrollState;
	console.log('Let me ride...');

});

$('#page-time-button').click(function() {
	
	var timeArray = timeChangeFunc(startTImeBase);
	var timeString = formatTimeOfDay( timeArray[ 0 ] );
	alert('Total Milliseconds since page open: ' + timeString + ' s');
	
});

$('#signup-button').click(function() {

	var timeArrayTemp = timeChangeFunc(startTime);
	var timeString = formatTimeOfDay( timeArrayTemp[ 0 ] );
	alert('Total Milliseconds since signup: ' +  timeString + ' s');
	startTime = timeArrayTemp[ 1 ];
	
});

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

window.formatTime = formatTimeOfDay;


});

	