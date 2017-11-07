var db = require("../models");
var updateMediaTable = require("./updateMediaExport.js").updateMediaTable;
var deleteRowFromTable = require("./updateMediaExport.js").deleteRowFromTable;

//require mediaUpdateExport
//this has the mediaupdate and the media delete functions

module.exports = app => {
	//CHECK IN A BOOK
	//PUT to checkouthistories table
	//CURL command:
	//curl -X PUT -H "Content-Type: application/json" -d '{"UserId": 1, "MediumId": 3}' http://localhost:3000/api/checkouthistories/checkin
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
				updateMediaTable("checkIn", req.body.mediumId);
				res.json(data);
			});
	});

	//CHECK OUT A BOOK WITH OR WITHOUT A RESERVATION
	//POST to checkouthistories table
	//CURL command:
	//curl -H "Content-Type: application/json" -X POST -d '{"MediumId": 1, "UserId": 1}' http://localhost:3000/api/checkouthistories/create
	app.post("/api/checkouthistories/create", (req, res) => {
		var hasReservation;

		db.CheckOutHistory
			.create({
				MediumId: req.body.mediumId,
				UserId: req.body.userId
			})
			.then(data => {
				//GET to reservations table
				//where UserId and MediumId
				//
				//if the user has a reservation for that book
				//hasReservation = true
				//else
				//hasReservation = false
			})
			.then(data => {
				//if hasReservation, run this code
				//DELETE to reservations table
				deleteRowFromTable(
					"reservations",
					req.body.userId,
					req.body.mediumId
				);
			})
			.then(data => {
				//if has reservation, run "checkoutWithReservation"
				//PUT to media table
				updateMediaTable("checkoutWithReservation", req.body.mediumId);

				//else, run "checkoutWithoutReservation"
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
