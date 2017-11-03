var db = require("../models");

// make sure date format matches createdAt field

module.exports = app => {
	//RESERVATION ROUTES

	//GET - using mediaId
	//MAKE THIS A FUNCTION WHERE YOU PASS IN "MediumId" or "UserId"
	app.get("/api/reservations/media/:MediumId", (req, res) => {
		db.Reservation
			.findAll({
				//will display as...
				// where: { MediumId: req.body.MediumId } OR { UserId: req.body.UserId }
				where: { MediumId: req.params.MediumId }
			})
			// console.log("THIS IS REQ.BODY");
			// console.log(req.body);
			.then(data => {
				res.json(data);
			});
	});

	//GET - using userId
	//CURL command:
	//curl -i http://localhost:3000/api/reservations/user/2
	app.get("/api/reservations/user/:UserId", (req, res) => {
		db.Reservation
			.findAll({
				//will display as...
				// where: { MediumId: req.body.MediumId } OR { UserId: req.body.UserId }
				where: { UserId: req.params.UserId }
			})
			.then(data => {
				res.json(data);
			});
	});

	//DELETE
	app.delete("/api/:table/:UserId/delete/:MediumId?", (req, res) => {
		var query = {};

		if (req.params.table === "users" || req.params.table === "media") {
			var id = req.params.UserId;
			query = {
				where: {
					id: id
				}
			};
		} else {
			query = {
				where: {
					UserId: req.params.UserId,
					MediumId: req.params.MediumId
				}
			};
		}

		var model;

		switch (req.params.table) {
			case "checkouthistory":
				model = db.CheckOutHistory;
				break;

			case "media":
				model = db.Medium;
				break;

			case "reservations":
				model = db.Reservation;
				break;

			case "reviews":
				model = db.Review;
				break;

			case "saveditems":
				model = db.SavedItem;
				break;

			case "users":
				model = db.User;
				break;

			default:
			//go to error function
		}

		console.log(model);

		model.destroy(query).then(data => {
			console.log("RECORD DELETED");
			res.json(data);
		});
	});

	//POST route for reserving a book
	//CURL command:
	//curl -H "Content-Type: application/json" -X POST -d '{"MediumId": 4, "UserId": 4}' http://localhost:3000/api/reservations/new
	app.post("/api/reservations/new", (req, res) => {
		db.Reservation
			.create({
				MediumId: req.body.MediumId,
				UserId: req.body.UserId
			})
			.then(data => {
				console.log("RECORD ADDED");
				res.json(data);
			});
	});

	//SAVED ITEM ROUTES
	//GET - using userId
	//POST - favorite and/or cart item
	//DELETE - favorite and/or cart item

	//CHECKOUT HISTORY ROUTES
	//GET
	//POST - CHECK OUT

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

	//USER ROUTES
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
