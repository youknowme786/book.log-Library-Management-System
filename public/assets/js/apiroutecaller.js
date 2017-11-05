//Created this file to have a place where we organize where/when we are using the different api-routes
//Could potentially call these functions using .on("click") OR call these functions as part of our routes?
//Example use - A user reserves a new book. We need to POST to reservations table and PUT to media table. The route could call the two functions that do those things

//RESERVATIONS LOGIC
console.log("This is api route caller .js");

function reserveMedia(mediumIdReserving, userIdReserving) {
	console.log("Reserving new media");
	var newReservation = {
		MediumId: mediumIdReserving,
		UserId: userIdReserving
	};

	//POST to reservations table
	$.post("/api/reservations/create", newReservation, reservation => {
		console.log("NEW RESERVATION MADE:");
		console.log(newReservation);
	}).then(() => {
		console.log("Entered .then after posting a new reservation");
	});

	//PUT to media table
}

$("#action-btn-reserve").on("click", function(event) {
	event.preventDefault();
	console.log("Reserve button pressed");

	// gets the book id of the ice cream and the cutomer name
	// var mediumId = $("#isbn").html();
	// console.log(id);
	// var userId = $(this).parent().closest('.input-group').children('.form-control').val();
	// if (customer === "") {
	//     alert("Please enter your name!");
	//     return;
	// }

	reserveMedia(6, 4);

	// sets a PUT ajax call to update the database
	// $.ajax("/api/reservations/create", {
	//     data: {
	//         MediumId: 4,
	//         UserId: 4
	//     },
	//     type: "POST"
	// }).then(function(data) {
	//     console.log("updated id ", id);
	//     console.log(data);
	//     // reloads the page to get the updated list
	//     // location.reload();
	// });
});
