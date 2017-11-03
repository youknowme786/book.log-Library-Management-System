var db = require("../models");
//imported to allow use of NOW() for updatedAt field
//done to make sure date format matches createdAt field
var sequelize = require("sequelize");

module.exports = function(app) {
	//POST route for reserving a book
	//CURL command:
	//curl -H "Content-Type: application/json" -X POST -d '{"MediumId": 4, "UserId": 4}' http://localhost:3000/api/reservations/new
	app.post("/api/reservations/new", (req, res) => {
		console.log(req.body);
		//update to work for multiple books using an array of cartBooks and forEach
		db.Reservation
			.create({
				MediumId: req.body.MediumId,
				UserId: req.body.UserId
			})
			.then(data => {
				res.json(data);
			});
	});

	//PUT route for checking a book back in
	//CURL command:
	//curl -X PUT -H "Content-Type: application/json" -d '{"id": 2}' http://localhost:3000/api/checkouthistory/checkin
	app.put("/api/checkouthistory/checkin", (req, res) => {
		//validation to add:
		//Only runs .update if isCheckedOut = true
		//if isCheckedOut = false, displays error
		db.CheckOutHistory
			.update(
				{
					isCheckedOut: false,
					//this only works using "updatedAt", NOT the field name "dateCheckedIn"
					updatedAt: sequelize.literal("NOW()")
				},
				{
					where: { id: req.body.id }
				}
			)
			.then(data => {
				res.json(data);
			});
	});
};
