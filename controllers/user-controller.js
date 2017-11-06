var db = require("../models");

module.exports = app => {
	//curl -i -H "Content-Type: application/json" http://localhost:3000/users/2
	app.get("/users/:userId", (req, res) => {
		let dataDeliverable = {};
		let userId = parseInt(req.params.userId);

		db.User
			.findAll({
				where: { id: userId }
			})
			.then(data => {
				dataDeliverable.userData = JSON.parse(JSON.stringify(data[0]));
			})
			.then(() => {
				return db.Reservation.findAll({
					where: { UserId: req.params.userId },
					include: [db.Medium]
				});
			})
			.then(data => {
				dataDeliverable.reservations = JSON.parse(JSON.stringify(data));
			})
			.then(() => {
				return db.Favorite.findAll({
					where: { UserId: req.params.userId },
					include: [db.Medium]
				});
			})
			.then(data => {
				dataDeliverable.favorites = JSON.parse(JSON.stringify(data));
			})
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
			.then(() => {
				return db.Review.findAll({
					where: { UserId: req.params.userId },
					include: [db.Medium]
				});
			})
			.then(data => {
				dataDeliverable.reviews = JSON.parse(JSON.stringify(data));
				// res.render("user", dataDeliverable);
			})
			.then(() => {
				let counter = 0;
				var target = dataDeliverable.reservations.length;

				dataDeliverable.reservations.forEach(reservation => {
					let mediumId = reservation.MediumId;
					// let numReserved = reservation.Medium.numReserved;

					db.Reservation
						.findAll({ where: { MediumId: mediumId } })
						.then(data => {
							// let thisData = JSON.parse(JSON.stringify(data));

							console.log(data.length);

							// thisData.forEach((item, index) => {
							data.forEach((item, index) => {
								if (item.UserId === userId) {
									reservation.position = index + 1;
								}
							});

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

							counter++;
							if (counter === target) {
								// res.json(dataDeliverable);
								res.render("user", dataDeliverable);
							}
						});
				});
			});
	});
};
