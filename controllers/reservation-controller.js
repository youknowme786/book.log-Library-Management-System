var db = require("../models");
var updateMediaTable = require("./updateMediaExport.js").updateMediaTable;
var deleteRowFromTable = require("./updateMediaExport.js").deleteRowFromTable;

//require mediaUpdateExport
//this has the mediaupdate and the media delete functions

module.exports = app => {
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
				return updateMediaTable("reserveMedia", req.body.mediumId);
			})
			.then(data => {
				res.json(data);
			});
	});
	//.then
	//maybe send back the position in reservation table

	//DELETE route for canceling a reservation
	//curl -H "Content-Type: application/json" -X DELETE -d '{"mediumId": 10, "userId": 4}' http://localhost:3000/api/reservations/delete
	app.delete("/api/reservations/delete", (req, res) => {
		deleteRowFromTable("reservations", req.body.userId, req.body.mediumId)
			.then(() => {
				return updateMediaTable("cancelReservation", req.body.mediumId);
			})
			.then(data => {
				res.json(data);
			});
	});
};
