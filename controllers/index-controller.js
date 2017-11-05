var db = require("../models");
var getBookInfoByISBN = require("../routes/test-google-books-api.js");

// index route for handlebars testing (returns titles and isbns)
module.exports = function(app) {
	//curl -i -H "Content-Type: application/json" -X GET http://localhost:3000/popular
	app.get("/index", (req, res) => {
		var dataDeliverable = {};

		db.Medium
			.findAll({
				limit: 10,
				order: [["totalNumCheckouts", "DESC"]]
			})
			.then(data => {
				// data is an array of objects
				// deep clone it into a deliverable variable
				dataDeliverable.popular = JSON.parse(JSON.stringify(data));

				db.Medium
					.findAll({
						limit: 10,
						order: [["createdAt", "DESC"]]
					})
					.then(data => {
						// data is an array of objects
						// deep clone it into a deliverable variable
						dataDeliverable.new = JSON.parse(JSON.stringify(data));

						console.log("==================");
						console.log(dataDeliverable);
						// res.json(dataDeliverable);
						res.render("index", dataDeliverable);
					});
			});
	});
};
