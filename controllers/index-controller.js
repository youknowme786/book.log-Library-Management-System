var db = require("../models");
var getBookInfoByISBN = require("../routes/test-google-books-api.js");

// index route for handlebars testing (returns titles and isbns)
module.exports = function(app) {
	//curl -i -H "Content-Type: application/json" -X GET http://localhost:3000/index
	app.get("/index", (req, response) => {
		var dataObject = {};

		// find 10 most popular items
		db.Medium
			.findAll({
				limit: 10,
				order: [["totalNumCheckouts", "DESC"]]
			})
			.then(data => {
				// data is an array of objects
				// deep clone and insert it into a deliverable variable
				dataObject.popular = JSON.parse(JSON.stringify(data));

				// find 10 newest items
				db.Medium
					.findAll({
						limit: 10,
						order: [["createdAt", "DESC"]]
					})
					.then(data => {
						// data is an array of objects
						// deep clone and insert it into a deliverable variable
						dataObject.new = JSON.parse(JSON.stringify(data));

						getBookInfoByISBN(dataObject, response);
					});
			});
	});
};
