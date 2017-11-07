var db = require("../models");
var updateMediaTable = require("./updateMediaExport.js").updateMediaTable;
var deleteRowFromTable = require("./updateMediaExport.js").deleteRowFromTable;

//require mediaUpdateExport
//this has the mediaupdate and the media delete functions

module.exports = app => {
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

	//CHECK IN A BOOK
	//PUT to checkouthistories table
	//CURL command:
	//curl -X PUT -H "Content-Type: application/json" -d '{"userId": 1, "mediumId": 3}' http://localhost:3000/api/checkouthistories/checkin
	app.put("/api/checkouthistories/update/checkin", (req, res) => {
		let dataDeliverable = {};

		db.CheckOutHistory
			.update(
				{
					isCheckedOut: false,
					//this only works using "updatedAt", NOT the field name "dateCheckedIn"
					updatedAt: db.Sequelize.literal("NOW()")
				},
				{
					where: {
						UserId: req.body.userId,
						MediumId: req.body.mediumId
					}
				}
			)
			.then(data => {
				//PUT to media table
				console.log(req.body.mediumId);
				updateMediaTable("checkIn", req.body.mediumId);
				res.json(data);
			});
	});

	//CHECK OUT A BOOK WITHOUT RESERVATION
	//POST to checkouthistories table
	//CURL command:
	//curl -H "Content-Type: application/json" -X POST -d '{"MediumId": 8, "UserId": 1}' http://localhost:3000/api/checkouthistories/create/withoutres
	app.post("/api/checkouthistories/create/withoutres", (req, res) => {
		db.CheckOutHistory
			.create({
				MediumId: req.body.mediumId,
				UserId: req.body.userId
			})
			.then(data => {
				//PUT to media table
				updateMediaTable(
					"checkoutWithoutReservation",
					req.body.mediumId
				);
				res.json(data);
			});
	});

	//CHECK OUT A BOOK WITH A RESERVATION
	//POST to checkouthistories table
	//CURL command:
	//curl -H "Content-Type: application/json" -X POST -d '{"mediumId": 1, "userId": 1}' http://localhost:3000/api/checkouthistories/create/withres
	app.post("/api/checkouthistories/create/withres", (req, res) => {
		db.CheckOutHistory
			.create({
				MediumId: req.body.mediumId,
				UserId: req.body.userId
			})
			.then(data => {
				//DELETE to reservations table
				deleteRowFromTable(
					"reservations",
					req.body.userId,
					req.body.mediumId
				);
			})
			.then(data => {
				//PUT to media table
				updateMediaTable("checkoutWithReservation", req.body.mediumId);
			});
	});

	//RENEW A BOOK
	//check in
	//PUT to checkouthistories table
	//CURL command:
	//curl -X PUT -H "Content-Type: application/json" -d '{"UserId": 4, "MediumId": 2}' http://localhost:3000/api/checkouthistories/update/renew
	app.put("/api/checkouthistories/update/renew", (req, res) => {
		let dataDeliverable = {};

		db.CheckOutHistory
			.update(
				{
					isCheckedOut: false,
					//this only works using "updatedAt", NOT the field name "dateCheckedIn"
					updatedAt: db.Sequelize.literal("NOW()")
				},
				{
					where: {
						UserId: req.body.userId,
						MediumId: req.body.mediumId
					}
				}
			)
			.then(data => {
				//PUT to media table
				updateMediaTable("checkIn", req.body.mediumId);
			})
			.then(() => {
				//check out without reservation
				//POST to checkouthistories table
				return db.CheckOutHistory.create({
					MediumId: req.body.mediumId,
					UserId: req.body.userId
				});
			})
			.then(data => {
				//DELETE to reservations table
				deleteRowFromTable(
					"reservations",
					req.body.userId,
					req.body.mediumId
				);
			})
			.then(data => {
				//PUT to media table
				updateMediaTable("checkoutWithReservation", req.body.mediumId);
				res.json(data);
			});
	});
};
