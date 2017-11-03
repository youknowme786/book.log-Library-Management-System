var db = require("../models");

// make sure date format matches createdAt field

module.exports = app => {
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
					updatedAt: db.Sequelize.literal("NOW()")
				},
				{
					where: { id: req.body.id }
				}
			)
			.then(data => {
				res.json(data);
			});
	});

	// POST route for adding a new user
	// cURL command:
	// curl -X POST -H "Content-Type: application/json" -d '{"firstName": "it", "lastName":"kazhmere", "userType":"Employee", "phoneNumber":"123-456-7890", "address":"i live here", "emailAddress":"i go here", "isEmployee":false}' http://localhost:3000/api/users/new
	app.post("/api/users/new", (req, res) => {
		console.log(req.body);

		var middleNameInput;
		if (req.body.middleName) {
			middleNameInput = req.body.middleName.trim();
		}

		var isEmployeeInput = false;
		if (req.body.userType === "Employee") {
			isEmployeeInput = true;
		}

		var phoneNumberInput = req.body.phoneNumber.replace(/[^\d]/g, "");

		db.User
			.create({
				firstName: req.body.firstName.trim(),
				middleName: middleNameInput,
				lastName: req.body.lastName.trim(),
				userType: req.body.userType,
				phoneNumber: req.body.phoneNumber.trim(),
				address: req.body.address.trim(),
				emailAddress: req.body.emailAddress.trim(),
				isEmployee: isEmployeeInput
			})
			.then(data => {
				res.json(data);
			});
	});
};
