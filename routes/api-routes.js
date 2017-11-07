var db = require("../models");

// make sure date format matches createdAt field

module.exports = app => {
	//DELETE from any table
	//provide the table name, user id, and medium id
	//if deleting from the users or media table/ enter the id in the :UserId parameter
	app.delete("/api/:table/:UserId/delete/:MediumId?", (req, res) => {
		var query = {};

		//Adjusts query if querying through users/media table where there are no foreign keys
		if (req.params.table === "users" || req.params.table === "media") {
			var id = req.params.UserId;
			query = {
				where: {
					id: id
				}
			};
		} else {
			query = {
				UserId: req.params.UserId,
				MediumId: req.params.MediumId
			};
		}

		var dbModel;

		//Takes table parameter and determines which Model to use
		switch (req.params.table) {
			case "checkouthistories":
				dbModel = db.CheckOutHistory;
				break;

			case "media":
				dbModel = db.Medium;
				break;

			case "reservations":
				dbModel = db.Reservation;
				break;

			case "reviews":
				dbModel = db.Review;
				break;

			case "users":
				dbModel = db.User;
				break;

			case "favorites":
				dbModel = db.Favorite;
				break;

			default:
			//go to error function
		}

		dbModel.destroy({ where: query }).then(data => {
			console.log("RECORD DELETED");
			res.json(data);
		});
	});

	//RESERVATION ROUTES

	//GET - using mediaId
	app.get("/api/reservations/media/:MediumId/:UserId?", (req, res) => {
		db.Reservation
			.findAll({
				where: { MediumId: req.params.MediumId }
			})
			.then(data => {
				var reservationsDeliverable = {};
				reservationsDeliverable.mediumReservations = data;

				//This block determines the User's position in the reservation list for a specific product if a UserId to search for is specified
				if (req.params.UserId !== undefined) {
					var UserId = parseInt(req.params.UserId);
					console.log("UserId: ", UserId);
					for (let i = 0; i < data.length; i++) {
						if (data[i].UserId === UserId) {
							console.log("Found user's position on list");
							reservationsDeliverable.userPosition = i + 1;
							break;
						}
					}
				}

				console.log(reservationsDeliverable);
				//implement this line once we have the user.handlebars file
				// res.render(/*some file*/, reservationsDeliverable);
				res.json(reservationsDeliverable);
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
				// res.render(/*some file*/, data);
			});
	});

	//POST route for reserving a book
	//CURL command:
	//curl -H "Content-Type: application/json" -X POST -d '{"MediumId": 10, "UserId": 4}' http://localhost:3000/api/reservations/create
	app.post("/api/reservations/create", (req, res) => {
		db.Reservation
			.create({
				MediumId: req.body.MediumId,
				UserId: req.body.UserId
			})
			.then(data => {
				console.log("RESERVATION ADDED");
				// res.json(data);
				//call updateMediaTable("reserveMedia", req.body.MediumId)
			});
	});

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

	//CHECKOUT HISTORY ROUTES
	//GET
	//MAKE THIS A FUNCTION WHERE YOU PASS IN "MediumId" or "UserId"
	//CURL command:
	//curl -i http://localhost:3000/api/checkouthistories/media/3
	app.get("/api/checkouthistories/media/:MediumId", (req, res) => {
		db.CheckOutHistory
			.findAll({
				//will display as...
				// where: { MediumId: req.body.MediumId } OR { UserId: req.body.UserId }
				where: { MediumId: req.params.MediumId }
			})
			// console.log("THIS IS REQ.BODY");
			// console.log(req.body);
			.then(data => {
				res.json(data);
				// res.render(/*some file*/, data);
			});
	});

	//GET - using userId
	//CURL command:
	//curl -i http://localhost:3000/api/checkouthistories/user/6
	app.get("/api/checkouthistories/user/:UserId", (req, res) => {
		db.CheckOutHistory
			.findAll({
				//will display as...
				// where: { MediumId: req.body.MediumId } OR { UserId: req.body.UserId }
				where: { UserId: req.params.UserId }
			})
			.then(data => {
				res.json(data);
				// resrender(/*some file*/, data);
			});
	});

	//POST - CHECK OUT
	//CURL command:
	//curl -H "Content-Type: application/json" -X POST -d '{"MediumId": 8, "UserId": 4}' http://localhost:3000/api/checkouthistories/create
	app.post("/api/checkouthistories/create", (req, res) => {
		db.CheckOutHistory
			.create({
				MediumId: req.body.MediumId,
				UserId: req.body.UserId
			})
			.then(data => {
				console.log("MEDIA CHECKED OUT");
				res.json(data);
			});
	});

	//PUT route for checking a book back in
	//CURL command:
	//curl -X PUT -H "Content-Type: application/json" -d '{"UserId": 1, "MediumId": 3}' http://localhost:3000/api/checkouthistory/checkin
	app.put("/api/checkouthistories/checkin", (req, res) => {
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
					where: {
						UserId: req.body.UserId,
						MediumId: req.body.MediumId
					}
				}
			)
			.then(data => {
				res.json(data);
			});
	});

	//USER ROUTES
	//GET route for viewing a user
	//CURL command:
	//curl -i http://localhost:3000/api/users/4
	app.get("/api/users/:id", (req, res) => {
		db.User
			.findAll({
				//will display as...
				// where: { MediumId: req.body.MediumId } OR { UserId: req.body.UserId }
				where: { id: req.params.id }
			})
			.then(data => {
				res.json(data);
				// resrender(/*some file*/, data);
			});
	});

	//TEST ROUTE
	app.get("/api/test", (req, res) => {
		console.log(req);
		res.json(req.user);
	});

	// POST route for adding a new user
	// cURL command:
	// curl -X POST -H "Content-Type: application/json" -d '{"firstName": "it", "lastName":"kazhmere", "userType":"Employee", "phoneNumber":"123-456-7890", "address":"i live here", "emailAddress":"i go here", "isEmployee":false}' http://localhost:3000/api/users/new
	app.post("/api/users/create", (req, res) => {
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
				streetAddress: req.body.streetAddress.trim(),
				city: req.body.city.trim(),
				state: req.body.state.trim(),
				zipCode: req.body.zipCode.trim(),
				emailAddress: req.body.emailAddress.trim(),
				isEmployee: isEmployeeInput
			})
			.then(data => {
				res.json(data);
			});
	});

	//PUT route for updating a user
	//CURL command:
	//curl -X PUT -H "Content-Type: application/json" -d '{"UserId": 1, "MediumId": 3}' http://localhost:3000/api/checkouthistory/checkin
	app.put("/api/users/update", (req, res) => {
		//Logic to set update Query goes here - similar to media PUT route

		db.CheckOutHistory
			.update(
				{
					updateQuery
				},
				{
					where: {
						id: req.body.id
					}
				}
			)
			.then(data => {
				res.json(data);
			});
	});
};
