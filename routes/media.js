var db = require("../models");
let request = require("request");

// make sure date format matches createdAt field

module.exports = app => {
	// CURL command:
	// curl -i -H "Content-Type: application/json" -X GET http://localhost:3000/api/media/0-7475-3269-9
	app.get("/api/media/:industryIdentifier?", (req, res) => {
		var query = {};
		if (req.params.industryIdentifier) {
			query.industryIdentifier = req.params.industryIdentifier;
		}

		db.Medium
			.findAll({
				where: query
			})
			.then(data => {
				res.json(data);
			});
	});

	// POST route for adding a new book
	// CURL command:
	// curl -H "Content-Type: application/json" -X POST -d '{"mediaType": "book", "industryIdentifier":"9780470199480", "totalStock":5, "numShelved":5}' http://localhost:3000/api/media/new
	app.post("/api/media/new", (req, response) => {
		console.log(req.body);

		var newMedium = {};
		newMedium.mediaType = req.body.mediaType;

		if (newMedium.mediaType === "book") {
			var isbn = req.body.industryIdentifier;
			newMedium.industryIdentifier = isbn;
		}

		var queryURL =
			"https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;

		request(queryURL, (err, res, body) => {
			if (!err && res.statusCode === 200) {
				var parsedBody = JSON.parse(body);
				volumeInfo = parsedBody.items[0].volumeInfo;

				newMedium.title = volumeInfo.title;
				newMedium.author = volumeInfo.authors[0];
				newMedium.summary = volumeInfo.description;

				if (volumeInfo.imageLinks) {
					newMedium.image = volumeInfo.imageLinks.thumbnail;
				} else {
					newMedium.image = "/assets/img/placeholder.gif";
				}

				newMedium.totalStock = 10;
				newMedium.numShelved = 10;

				console.log(newMedium);

				db.Medium.create(newMedium).then(data => {
					console.log(data);
					response.json(data);
				});
			}
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
