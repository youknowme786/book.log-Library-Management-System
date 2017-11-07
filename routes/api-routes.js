var db = require("../models");

// make sure date format matches createdAt field

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

	//FAVORITES ROUTES
	//GET - using userId
	//CURL command:
	//curl -i http://localhost:3000/api/2/favorites
	app.get("/api/:UserId/favorites", (req, res) => {
		db.Favorite
			.findAll({
				where: { UserId: req.params.UserId }
			})
			.then(data => {
				res.json(data);
				// res.render(/*some file*/, data);
			});
	});

	//POST - favorite item
	//CURL command:
	//curl -H "Content-Type: application/json" -X POST -d '{"MediumId": 1, "UserId": 1}' http://localhost:3000/api/favorites/create
	app.post("/api/favorites/create", (req, res) => {
		db.Favorite
			.create({
				MediumId: req.body.MediumId,
				UserId: req.body.UserId
			})
			.then(data => {
				console.log("FAVORITE ADDED");
				res.json(data);
			});
	});

	//DELETE - favorite item - see generic delete route

	// //CHECKOUT HISTORY ROUTES
	// //GET
	// //MAKE THIS A FUNCTION WHERE YOU PASS IN "MediumId" or "UserId"
	// //CURL command:
	// //curl -i http://localhost:3000/api/checkouthistories/media/3
	// app.get("/api/checkouthistories/media/:MediumId", (req, res) => {
	// 	db.CheckOutHistory
	// 		.findAll({
	// 			//will display as...
	// 			// where: { MediumId: req.body.MediumId } OR { UserId: req.body.UserId }
	// 			where: { MediumId: req.params.MediumId }
	// 		})
	// 		// console.log("THIS IS REQ.BODY");
	// 		// console.log(req.body);
	// 		.then(data => {
	// 			res.json(data);
	// 			// res.render(/*some file*/, data);
	// 		});
	// });

	// //GET - using userId
	// //CURL command:
	// //curl -i http://localhost:3000/api/checkouthistories/user/6
	// app.get("/api/checkouthistories/user/:UserId", (req, res) => {
	// 	db.CheckOutHistory
	// 		.findAll({
	// 			//will display as...
	// 			// where: { MediumId: req.body.MediumId } OR { UserId: req.body.UserId }
	// 			where: { UserId: req.params.UserId }
	// 		})
	// 		.then(data => {
	// 			res.json(data);
	// 			// resrender(/*some file*/, data);
	// 		});
	// });

