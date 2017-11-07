console.log("Index.js is linked.")

$(document).ready(function() {
	$("#PopularCarousel").owlCarousel({
		loop: true,
		margin: 0,
		items: 1,
		stagePadding: 70,
		center: true,
		responsive: {
			600: {
				items: 2,
				stagePadding: 0,
				center: false
			},
			750: {
				items: 3,
				stagePadding: 0,
				center: false
			},
			1100: {
				items: 4,
				stagePadding: 0,
				center: false
			}
		}
	})
	$('#NewCarousel').owlCarousel({
		loop: true,
		margin: 0,
		items: 1,
		stagePadding: 70,
		center: true,
		responsive: {
			600: {
				items: 2,
				stagePadding: 0,
				center: false
			},
			750: {
				items: 3,
				stagePadding: 0,
				center: false
			},
			1100: {
				items: 4,
				stagePadding: 0,
				center: false
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

