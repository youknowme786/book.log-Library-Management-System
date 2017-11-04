var db = require("../models");

// make sure date format matches createdAt field

module.exports = app => {
	// CURL command:
	// curl -i -H "Content-Type: application/json" -X GET http://localhost:3000/api/media/0-7475-3269-9
	app.get("/api/media/:genericId?", (req, res) => {
		var query = {};
		if (req.params.genericId) {
			query.genericId = req.params.genericId;
		}

		db.Medium
			.findAll({
				where: query
			})
			.then(data => {
				return data[0].id;
			});
	});

	// POST route for adding a new book
	// CURL command:
	// curl -H "Content-Type: application/json" -X POST -d '{"title": "the chronicle of imran", "mediaType": "book", "genericId":"9780470199480", "totalStock":5, "numShelved":5}' http://localhost:3000/api/media/new
	app.post("/api/media/new", (req, res) => {
		console.log(req.body);

		var genericIdInput = req.body.genericId.trim();
		if (genericIdInput === "") {
			genericIdInput = null;
		}

		// var numReservedInput = req.body.numReserved.trim();
		// if (numReservedInput === "") {
		// 	numReservedInput === 0;
		// }

		// var waitlistSizeInput = numReservedInput;

		//update to work for multiple books using an array of cartBooks and forEach
		db.Medium
			.create({
				title: req.body.title.trim(),
				mediaType: req.body.mediaType,
				genericId: genericIdInput,
				totalStock: parseInt(req.body.totalStock, 10),
				numShelved: parseInt(req.body.totalStock, 10)
			})
			.then(data => {
				res.json(data);
			});
	});

	function updateMediaTable(action) {
		switch (action) {
			case "checkoutWithoutReservation":
				console.log(action);

				var updateQuery = {
					// update text here
				};
				break;

			case "checkoutWithReservation":
				console.log(action);

				var updateQuery = {
					// update text here
				};
				break;

			case "checkIn":
				// if ((numShelved + numReserved) < reservationListSize) {}
				// numReserved++
				// else numShelved++
				console.log(action);

				var updateQuery = {
					// update text here
				};
				break;

			case "makeReservation":
				console.log(action);

				var updateQuery = {
					// update text here
				};
				break;

			case "cancelReservation":
				console.log(action);

				var updateQuery = {
					// update text here
				};
				break;

			case "deleteItem":
				console.log(action);

				var updateQuery = {
					// update text here
				};
				break;

			case "addItem":
				console.log(action);

				var updateQuery = {
					// update text here
				};
				break;

			default:
				console.log(action);
				break;
		}

		app.put("/api/media/:MediumId", (req, res) => {
			db.Medium
				.update(updateQuery, {
					where: { id: req.params.MediumId }
				})
				.then(data => {
					res.json(data);
				});
		});
	}
};
