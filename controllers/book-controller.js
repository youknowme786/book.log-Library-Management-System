var db = require("../models");
let request = require("request");

module.exports = app => {
	// curl -i -H "Content-Type: application/json" -X GET http://localhost:3000/media/book/9781781100523
	app.get("/media/:mediaType/:industryIdentifier", (req, response) => {
		var query = {};
		query.mediaType = req.params.mediaType;
		query.industryIdentifier = req.params.industryIdentifier;

		db.Medium
			.findAll({
				where: query
			})
			.then(data => {
				var dataDeliverable = JSON.parse(JSON.stringify(data[0]));

				console.log(dataDeliverable);
				response.render("book", dataDeliverable);
			});
	});
};
