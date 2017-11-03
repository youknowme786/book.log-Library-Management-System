var db = require("../models");
//imported to allow use of NOW() for updatedAt field
//done to make sure date format matches createdAt field
var sequelize = require("sequelize");

//Routes related to updating CheckOutHistory table
module.exports = function(app) {
	//PUT route for checking a book back in
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
