var db = require("../models");

// make sure date format matches createdAt field

module.exports = {
	updateMediaTable: (action, mediumId) => {
		var updateData = {};

		db.Medium
			.findAll({
				where: { id: mediumId }
			})
			.then(data => {
				updateData.totalStock = data[0].totalStock;
				updateData.numShelved = data[0].numShelved;
				updateData.numReserved = data[0].numReserved;
				updateData.reservationListSize = data[0].reservationListSize;
				updateData.numCheckedOut = data[0].numCheckedOut;
				updateData.totalNumCheckouts = data[0].totalNumCheckouts;

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
							if (
								updateData.numReserved ===
								updateData.reservationListSize
							) {
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
							updateData.numCheckedOut++;
							updateData.totalNumCheckouts++;
						}
						break;

					case "checkIn":
						if (updateData.numCheckedOut > 0) {
							if (
								updateData.numReserved <
								updateData.reservationListSize
							) {
								updateData.numReserved++;
							} else {
								updateData.numShelved++;
							}
							updateData.numCheckedOut--;
						}
						break;

					case "deleteOneItem":
						if (updateData.totalStock > 0) {
							if (updateData.numShelved > 0) {
								updateData.numShelved--;
							} else if (updateData.numReserved > 0) {
								updateData.numReserved--;
							}
						}
						break;

					case "addOneItem":
						if (
							updateData.reservationListSize >
							updateData.numReserved
						) {
							updateData.numReserved++;
						} else {
							updateData.numShelved++;
						}
						break;

					default:
						console.log("feature not yet implemented");
						break;
				}
			})
			.then(() => {
				return db.Medium.update(updateData, {
					where: { id: mediumId }
				});
			})
			.then(data => {
				console.log("Media rows affected: " + data);
				return data;
			});
	}, // function updateMediaTable(){}}

	deleteRowFromTable: (table, userId, mediumId) => {
		//DELETE from any table
		//provide the table name, user id, and medium id
		//if deleting from the users or media table/ enter the id in the :UserId parameter
		var query = {};

		//Adjusts query if querying through users/media table where there are no foreign keys

		if (table === "users") {
			var id = userId;
			query = {
				id: id
			};
		} else if (table === "media") {
			var industryIdentifier = userId;
			query = {
				industryIdentifier: industryIdentifier
			};
		} else {
			query = {
				UserId: userId,
				MediumId: mediumId
			};
		}

		var dbModel;

		//Takes table parameter and determines which Model to use
		switch (table) {
			case "checkouthistories":
				dbModel = db.CheckOutHistory;
				break;

			case "media":
				dbModel = db.Medium;
				break;

			case "reservations":
				dbModel = db.Reservation;
				break;

			case "reviews":
				dbModel = db.Review;
				break;

			case "users":
				dbModel = db.User;
				break;

			case "favorites":
				dbModel = db.Favorite;
				break;

			default:
				console.log("error");
				//go to error function
				break;
		}

		dbModel.destroy({ where: query }).then(data => {
			console.log("Delete rows affected " + data);
			return data;
		});
	} // function deleteItemfromTable(){}
};
