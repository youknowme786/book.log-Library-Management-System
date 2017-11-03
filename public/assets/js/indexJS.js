$(document).ready(function() {
	$("#PopularCarousel").owlCarousel({
		loop: true,
		margin: 25,
		items: 4,
		mouseDrag: false
	})
	$('#NewCarousel').owlCarousel({
		loop: true,
		margin: 25,
		items: 4,
	})
	$("#FeaturedCarousel").owlCarousel({
		loop: true,
		margin: 0,
		items: 1
	})
});

var NewCarousel = $("#PopularCarousel");
var PopularCarousel = $("#NewCarousel");
var FeaturedCarousel = $("#FeaturedCarousel");

$("#Popular-RArrow").on("click", function() {
	NewCarousel.trigger("next.owl.carousel")
})

$("#Popular-LArrow").on("click", function() {
	NewCarousel.trigger("prev.owl.carousel")
})

$("#New-RArrow").on("click", function() {
	PopularCarousel.trigger("next.owl.carousel")
})

$("#New-LArrow").on("click", function() {
	PopularCarousel.trigger("prev.owl.carousel")
})