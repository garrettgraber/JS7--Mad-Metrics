$(document).on('ready', function() {

	var pageTotalViewed = function() {
		var totalPageHeight = $(document).height();
		var windowHeight = $(window).height();
		var windowScroll = $(window).scrollTop();
		var totalUserView = windowHeight + windowScroll;
		var percentViewed = ( totalUserView / totalPageHeight ) * 100.0;
		var percentViewedRound = percentViewed.toFixed(2);
		alert("Percentage of the page viewed: " + percentViewed + ' %');
	}

	$('#page-view-button').on('click', pageTotalViewed );

	$('.fire-button').on('click', function() {
		alert('You have pressed one of the fire buttons, BEWARE!');
	});
});