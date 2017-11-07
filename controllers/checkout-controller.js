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
						UserId: req.body.UserId,
						MediumId: req.body.MediumId
					}
				}
			)
			.then(data => {
				//PUT to media table
				updateMediaTable("checkIn", req.body.MediumId);
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
				MediumId: req.body.MediumId,
				UserId: req.body.UserId
			})
			.then(data => {
				//PUT to media table
				updateMediaTable(
					"checkoutWithoutReservation",
					req.body.MediumId
				);
				res.json(data);
			});
	});

	//CHECK OUT A BOOK WITH A RESERVATION
	//POST to checkouthistories table
	//CURL command:
	//curl -H "Content-Type: application/json" -X POST -d '{"MediumId": 1, "UserId": 1}' http://localhost:3000/api/favorites/create
	app.post("/api/checkouthistories/create/withres", (req, res) => {
		db.CheckOutHistory
			.create({
				MediumId: req.body.MediumId,
				UserId: req.body.UserId
			})
			.then(data => {
				//DELETE to reservations table
				deleteRowFromTable(
					"reservations",
					req.body.UserId,
					req.body.MediumId
				);
			})
			.then(data => {
				//PUT to media table
				updateMediaTable("checkoutWithReservation", req.body.MediumId);
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
						UserId: req.body.UserId,
						MediumId: req.body.MediumId
					}
				}
			)
			.then(data => {
				//PUT to media table
				updateMediaTable("checkIn", req.body.MediumId);
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
					"reservations",
					req.body.UserId,
					req.body.MediumId
				);
			})
			.then(data => {
				//PUT to media table
				updateMediaTable("checkoutWithReservation", req.body.MediumId);
				res.json(data);
			});
	});
};
