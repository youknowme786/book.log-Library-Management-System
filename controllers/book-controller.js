var db = require("../models");
var path = require("path");
let request = require("request");

module.exports = app => {
	app.get("/media/:mediaType/:industryIdentifier", (req, response) => {
		var query = {};
		query.industryIdentifier = req.params.industryIdentifier;

		db.Medium
			.findAll({
				where: query
			})
			.then(data => {
				var dataDeliverable = JSON.parse(JSON.stringify(data[0]));

				var queryURL =
					"https://www.googleapis.com/books/v1/volumes?q=isbn:" +
					dataDeliverable.industryIdentifier;

				console.log(queryURL);

				request(queryURL, (err, res, body) => {
					if (!err && res.statusCode === 200) {
						var parsedBody = JSON.parse(body);
						if (parsedBody.items[0].volumeInfo.title) {
							dataDeliverable.dataTitle = parsedBody.items[0].volumeInfo.title;
						}

						if (parsedBody.items[0].volumeInfo.authors) {
							dataDeliverable.dataAuthor =
								parsedBody.items[0].volumeInfo.authors[0];
						}

						if (parsedBody.items[0].volumeInfo.description) {
							dataDeliverable.dataSummary =
								parsedBody.items[0].volumeInfo.description;
						}

						if (parsedBody.items[0].volumeInfo.imageLinks) {
							dataDeliverable.dataImage =
								parsedBody.items[0].volumeInfo.imageLinks.thumbnail;
						}

						if (parsedBody.items[0].volumeInfo.industryIdentifiers[0]) {
							dataDeliverable[
								"data" +
									parsedBody.items[0].volumeInfo.industryIdentifiers[0].type
							] =
								parsedBody.items[0].volumeInfo.industryIdentifiers[0].identifier;
						}

						if (parsedBody.items[0].volumeInfo.industryIdentifiers[1]) {
							dataDeliverable[
								"data" +
									parsedBody.items[0].volumeInfo.industryIdentifiers[1].type
							] =
								parsedBody.items[0].volumeInfo.industryIdentifiers[1].identifier;
						}
					}

					response.json(dataDeliverable);
				});
			});
	});
};
