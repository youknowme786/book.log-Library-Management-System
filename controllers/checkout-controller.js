var db = require("../models");
var updateMediaTable = require("./updateMediaExport.js").updateMediaTable;
var deleteRowFromTable = require("./updateMediaExport.js").deleteRowFromTable;

//require mediaUpdateExport
//this has the mediaupdate and the media delete functions

module.exports = app => {
	//CHECK IN A BOOK
	//PUT to checkouthistories table
	//CURL command:
	//curl -X PUT -H "Content-Type: application/json" -d '{"UserId": 1, "MediumId": 3}' http://localhost:3000/api/checkouthistory/checkin
	app.put("/api/checkouthistories/checkin", (req, res) => {
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
						UserId: req.body.UserId,
						MediumId: req.body.MediumId
					}
				}
			)
			.then(data => {
				//PUT to media table
				updateMediaTable(res, "checkIn", req.body.MediumId);
			});
	});

	//CHECK OUT A BOOK WITHOUT RESERVATION
	//POST to checkouthistories table
	//CURL command:
	//curl -H "Content-Type: application/json" -X POST -d '{"MediumId": 8, "UserId": 4}' http://localhost:3000/api/checkouthistories/create
	app.post("/api/checkouthistories/create/nores", (req, res) => {
		db.CheckOutHistory
			.create({
				MediumId: req.body.MediumId,
				UserId: req.body.UserId
			})
			.then(data => {
				//PUT to media table
				updateMediaTable(
					res,
					"checkoutWithoutReservation",
					req.body.MediumId
				);
			});
	});

	//CHECK OUT A BOOK WITH A RESERVATION
	//POST to checkouthistories table
	//CURL command:
	//curl -H "Content-Type: application/json" -X POST -d '{"MediumId": 1, "UserId": 1}' http://localhost:3000/api/favorites/create
	app.post("/api/checkouthistories/create/fulfillres", (req, res) => {
		db.CheckOutHistory
			.create({
				MediumId: req.body.MediumId,
				UserId: req.body.UserId
			})
			.then(data => {
				//DELETE to reservations table
				deleteRowFromTable(
					res,
					"reservations",
					req.body.UserId,
					req.body.MediumId
				);
			})
			.then(data => {
				//PUT to media table
				updateMediaTable(
					res,
					"checkoutWithReservation",
					req.body.MediumId
				);
			});
	});

	//RENEW A BOOK
	//check in
	//PUT to checkouthistories table
	//CURL command:
	//curl -X PUT -H "Content-Type: application/json" -d '{"UserId": 1, "MediumId": 3}' http://localhost:3000/api/checkouthistory/checkin
	app.put("/api/checkouthistories/renew", (req, res) => {
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
						UserId: req.body.UserId,
						MediumId: req.body.MediumId
					}
				}
			)
			.then(data => {
				//PUT to media table
				updateMediaTable(res, "checkIn", req.body.MediumId);
			})
			.then(() => {
				//check out without reservation
				//POST to checkouthistories table
				return db.CheckOutHistory.create({
					MediumId: req.body.MediumId,
					UserId: req.body.UserId
				});
			})
			.then(data => {
				//DELETE to reservations table
				deleteRowFromTable(
					res,
					"reservations",
					req.body.UserId,
					req.body.MediumId
				);
			})
			.then(data => {
				//PUT to media table
				updateMediaTable(
					res,
					"checkoutWithReservation",
					req.body.MediumId
				);
			});
	});
};
