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
	}); // app.get

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

		var queryURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;

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
	}); // app.post

	// function updateMediaTable(action, mediumId) {

	// // comment out below if using fxn
	app.get("/testupdate/:action/:mediumId", (req, res) => {
		action = req.params.action;
		mediumId = req.params.mediumId;
		// // comment out above if using fxn

		db.Medium
			.findAll({
				where: { id: mediumId }
			})
			.then(data => {
				console.log(action + " medium:" + mediumId);

				var updateData = {};
				updateData.totalStock = data[0].totalStock;
				updateData.numShelved = data[0].numShelved;
				updateData.numReserved = data[0].numReserved;
				updateData.reservationListSize = data[0].reservationListSize;
				updateData.numCheckedOut = data[0].numCheckedOut;
				updateData.totalNumCheckouts = data[0].totalNumCheckouts;

				console.log(updateData);

				switch (action) {
					case "reserveMedia":
						if (updateData.numShelved > 0) {
							updateData.numShelved--;
							updateData.numReserved++;
						}
						updateData.reservationListSize++;
						break;

					case "cancelReservation":
						if (updateData.numReserved > 0) {
							if (updateData.numReserved === updateData.reservationListSize) {
								updateData.numShelved++;
								updateData.numReserved--;
							}
							updateData.reservationListSize--;
						}
						break;

					case "checkoutWithoutReservation":
						if (updateData.numShelved > 0) {
							updateData.numShelved--;
							updateData.numCheckedOut++;
							updateData.totalNumCheckouts++;
						}
						break;

					case "checkoutWithReservation":
						if (updateData.numReserved > 0) {
							updateData.numReserved--;
							updateData.reservationListSize--;
							updata.numCheckedOut++;
							updateData.totalNumCheckouts++;
						}
						break;

					case "checkIn":
						if (updateData.numCheckedOut > 0) {
							if (updateData.numReserved < reservationListSize) {
								updateData.numReserved++;
							} else {
								updateData.numShelved++;
							}
							updateData.numCheckedOut--;
						}
						break;

					case "deleteItem":
						if (updateData.totalStock > 0) {
							if (updateData.numShelved > 0) {
								updateData.numShelved--;
							} else if (updateData.numReserved > 0) {
								updateData.numReserved--;
							}
						}
						break;

					case "addItem":
						updateData.numShelved++;
						break;

					default:
						console.log(action);

						res.json("feature not yet implemented");
						break;
				}
				console.log(updateData);

				db.Medium
					.update(updateData, {
						where: { id: mediumId }
					})
					.then(data => {
						res.json("rows affected: " + data[0]);
					});
			}); // db.medium.findAll().then()
	}); // app.get() // comment out if using fxn
	// } // function updateMediaTable(){}
};
