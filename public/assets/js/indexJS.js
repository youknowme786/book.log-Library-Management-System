console.log("Index.js is linked.")

$(document).ready(function() {
	$("#PopularCarousel").owlCarousel({
		loop: true,
		margin: 0,
		items: 1,
		responsive: {
			600: {
				items: 2
			},
			750: {
				items: 3
			},
			1100: {
				items: 4
			}
		}
	})
	$('#NewCarousel').owlCarousel({
		loop: true,
		margin: 0,
		items: 4,
		responsive: {
			600: {
				items: 2
			},
			750: {
				items: 3
			},
			1100: {
				items: 4
			}
		}
	})
	$("#FeaturedCarousel").owlCarousel({
		loop: true,
		margin: 0,
		items: 1,
		autoplay: true,
		autoplayTimeout: 4000,
		smartSpeed: 750,
	})
});

var NewCarousel = $("#PopularCarousel");
var PopularCarousel = $("#NewCarousel");
var FeaturedCarousel = $("#FeaturedCarousel");

$("#Featured-LArrow").on("click", function() {
	FeaturedCarousel.trigger("prev.owl.carousel")
})

$("#Featured-RArrow").on("click", function() {
	FeaturedCarousel.trigger("next.owl.carousel")
})

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

