var db = require("../models");
let request = require("request");

module.exports = app => {
	app.get("/users/:userId", (req, response) => {
		var query = {};
		query.id = req.params.userId;

		db.User
			.findAll({
				where: query
			})
			.then(data => {
				var dataDeliverable = JSON.parse(JSON.stringify(data[0]));
				// response.json(dataDeliverable);
				response.render("user", dataDeliverable);
			});
	});
};
