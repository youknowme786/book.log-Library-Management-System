var db = require("../models");
let request = require("request");

module.exports = app => {
	app.get("/users/:userId", (req, response) => {
		var query = {};
		query.id = req.params.userId;

		let dataDeliverable = {};

		dataDeliverable.userData = db.User
			.findAll({
				where: query
			})
			.then(data => {
				dataDeliverable.userData = JSON.parse(JSON.stringify(data[0]));
				response.json(dataDeliverable);
				// response.render("user", dataDeliverable);
			});

		// dataDeliverable.userData = db.User
		// 	.findAll({
		// 		where: query
		// 	})
		// 	.then(data => {
		// 		dataDeliverable.userData = JSON.parse(JSON.stringify(data[0]));
		// 		response.json(dataDeliverable);
		// 		// response.render("user", dataDeliverable);
		// 	});
	});
};
