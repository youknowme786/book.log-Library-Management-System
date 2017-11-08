var db = require("../models");
var updateMediaTable = require("./updateMediaExport.js").updateMediaTable;
var deleteRowFromTable = require("./updateMediaExport.js").deleteRowFromTable;

//require mediaUpdateExport
//this has the mediaupdate and the media delete functions

module.exports = app => {
	// //RESERVATION ROUTES

	// //GET - using mediaId
	// app.get("/api/reservations/media/:MediumId/:UserId?", (req, res) => {
	// 	db.Reservation
	// 		.findAll({
	// 			where: { MediumId: req.params.MediumId }
	// 		})
	// 		.then(data => {
	// 			var reservationsDeliverable = {};
	// 			reservationsDeliverable.mediumReservations = data;

	// 			//This block determines the User's position in the reservation list for a specific product if a UserId to search for is specified
	// 			if (req.params.UserId !== undefined) {
	// 				var UserId = parseInt(req.params.UserId);
	// 				console.log("UserId: ", UserId);
	// 				for (let i = 0; i < data.length; i++) {
	// 					if (data[i].UserId === UserId) {
	// 						console.log("Found user's position on list");
	// 						reservationsDeliverable.userPosition = i + 1;
	// 						break;
	// 					}
	// 				}
	// 			}

	// 			console.log(reservationsDeliverable);
	// 			//implement this line once we have the user.handlebars file
	// 			// res.render(/*some file*/, reservationsDeliverable);
	// 			res.json(reservationsDeliverable);
	// 		});
	// });

	// //GET - using userId
	// //CURL command:
	// //curl -i http://localhost:3000/api/reservations/user/2
	// app.get("/api/reservations/user/:UserId", (req, res) => {
	// 	db.Reservation
	// 		.findAll({
	// 			//will display as...
	// 			// where: { MediumId: req.body.MediumId } OR { UserId: req.body.UserId }
	// 			where: { UserId: req.params.UserId }
	// 		})
	// 		.then(data => {
	// 			res.json(data);
	// 			// res.render(/*some file*/, data);
	// 		});
	// });

	//POST route for reserving an item
	//CURL command:
	//curl -H "Content-Type: application/json" -X POST -d '{"mediumId": 10, "userId": 4}' http://localhost:3000/api/reservations/create
	app.post("/api/reservations/create", (req, res) => {
		db.Reservation
			.create({
				MediumId: req.body.mediumId,
				UserId: req.body.userId
			})
			.then(data => {
				console.log("RESERVATION ADDED");
				// res.json(data);
			})
			.then(() => {
				updateMediaTable("reserveMedia", req.body.mediumId);
			})
			.then(data => {
				res.json(data);
			});
	});
	//.then
	//maybe send back the position in reservation table

	//DELETE route for canceling a reservation
	//curl -H "Content-Type: application/json" -X DELETE -d '{"mediumId": 10, "userId": 4}' http://localhost:3000/api/reservations/delete
	app.delete("/api/reservations/:userId/delete/:mediumId", (req, res) => {
		console.log(
			"==============res controller delete ",
			req.params.userId,
			req.params.mediumId
		);
		Promise.resolve(
			deleteRowFromTable(
				"reservations",
				req.params.userId,
				req.params.mediumId
			)
		)
			.then(() => {
				console.log("about to update media table");
				updateMediaTable("cancelReservation", req.params.mediumId);
			})
			.then(data => {
				res.json(data);
			});
	});
};
