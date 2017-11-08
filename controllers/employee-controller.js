var db = require("../models");

module.exports = app => {
	app.get("/manage", (req, res) => {
		res.render("manage");
	});

	//GET user info
	//curl -i -H "Content-Type: application/json" http://localhost:3000/users/2
	app.get("/manage/users/:userId", (req, res) => {
		// this object is given to the front end
		let dataDeliverable = {};
		let userId = req.params.userId;

		db.User
			// find all info for the and add it to the deliverable
			.findAll({
				where: { id: userId }
			})
			.then(data => {
				dataDeliverable.userData = JSON.parse(JSON.stringify(data[0]));
			})
			// then find all reservations made by the user and add it to the deliverable
			.then(() => {
				return db.Reservation.findAll({
					where: { UserId: req.params.userId },
					include: [db.Medium]
				});
			})
			.then(data => {
				dataDeliverable.reservations = JSON.parse(JSON.stringify(data));
			})
			// then find all items favorited by the user and add them to the deliverable
			.then(() => {
				return db.Favorite.findAll({
					where: { UserId: req.params.userId },
					include: [db.Medium]
				});
			})
			.then(data => {
				dataDeliverable.favorites = JSON.parse(JSON.stringify(data));
			})
			// then find all checkout history for the user and add it to the deliverable
			.then(() => {
				return db.CheckOutHistory.findAll({
					where: { UserId: req.params.userId },
					include: [db.Medium]
				});
			})
			.then(data => {
				dataDeliverable.checkOutHistories = JSON.parse(
					JSON.stringify(data)
				);
			})
			// then find all reviews written by the user and add them to the deliverable
			.then(() => {
				return db.Review.findAll({
					where: { UserId: req.params.userId },
					include: [db.Medium]
				});
			})
			.then(data => {
				dataDeliverable.reviews = JSON.parse(JSON.stringify(data));
			})
			.then(() => {
				// set a counter for the loop
				let counter = 0;
				var target = dataDeliverable.reservations.length;

				if (dataDeliverable.reservations.length > 0) {
					// for each reservation the user has made
					dataDeliverable.reservations.forEach(reservation => {
						let mediumId = reservation.MediumId;

						// find all reservations made for that item
						db.Reservation
							.findAll({ where: { MediumId: mediumId } })
							.then(data => {
								// then for each reservation find the user's position in line and add it to the deliverable
								data.forEach((item, index) => {
									if (item.UserId === userId) {
										reservation.position = index + 1;
									}
								});

								// add information to the deliverable about the user's reservation status for each item
								if (
									reservation.position >
									reservation.Medium.numReserved
								) {
									reservation.reservationStatus =
										"Position " +
										reservation.position +
										" on Waitlist";
								} else {
									reservation.reservationStatus =
										"Ready to Pick Up";
								}

								// increment the counter
								counter++;
								// if the counter has reached the target, return the deliverable to the front end and render the user page
								if (counter === target) {
									console.log("counter ==== target");
									// console.log(dataDeliverable);
									// res.end();
									// res.json(dataDeliverable);
									res.render("manage-users", dataDeliverable);
								}
							});
					});
				} else {
					res.render("manage-users", dataDeliverable);
				}
			});
	});
};
