var db = require("../models");
let request = require("request");

module.exports = app => {
	app.get("/users/:userId", (req, response) => {
		let dataDeliverable = {};

		db.User
			.findAll({
				where: { id: req.params.userId }
			})
			.then(data => {
				dataDeliverable.userData = JSON.parse(JSON.stringify(data[0]));
				// response.json(dataDeliverable);
				// response.render("user", dataDeliverable);
			});

		db.Reservation
			.findAll({
				where: { UserId: req.params.userId },
				include: [db.Medium]
			})
			.then(data => {
				dataDeliverable.reservations = JSON.parse(JSON.stringify(data));
			});

		db.Favorite
			.findAll({
				where: { UserId: req.params.userId },
				include: [db.Medium]
			})
			.then(data => {
				dataDeliverable.favorites = JSON.parse(JSON.stringify(data));
			});

		db.CheckOutHistory
			.findAll({
				where: { UserId: req.params.userId },
				include: [db.Medium]
			})
			.then(data => {
				dataDeliverable.checkOutHistories = JSON.parse(
					JSON.stringify(data)
				);
			});

		db.Review
			.findAll({
				where: { UserId: req.params.userId },
				include: [db.Medium]
			})
			.then(data => {
				dataDeliverable.reviews = JSON.parse(JSON.stringify(data));
			});

		setTimeout(() => {
			// response.json(dataDeliverable);
			response.render("user", dataDeliverable);
		}, 2000);

		// dataDeliverable.waitingList = db.waitingList;
	});
};
