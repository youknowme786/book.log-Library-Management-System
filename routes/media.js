var db = require("../models");

// make sure date format matches createdAt field

module.exports = app => {
	function updateMediaTable(action, mediumId) {
		// // comment out below if using fxn
		// app.get("/updateMediaTable/:action/:mediumId", (req, res) => {
		// 	action = req.params.action;
		// 	mediumId = req.params.mediumId;
		// // comment out above if using fxn

		db.Medium
			.findAll({
				where: { id: mediumId }
			})
			.then(data => {
				console.log(action + " medium:" + mediumId);

				var updateData = {};
				updateData.totalStock = data[0].totalStock;
				updateData.numShelved = data[0].numShelved;
				updateData.numReserved = data[0].numReserved;
				updateData.reservationListSize = data[0].reservationListSize;
				updateData.numCheckedOut = data[0].numCheckedOut;
				updateData.totalNumCheckouts = data[0].totalNumCheckouts;

				console.log(updateData);

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
							updata.numCheckedOut++;
							updateData.totalNumCheckouts++;
						}
						break;

					case "checkIn":
						if (updateData.numCheckedOut > 0) {
							if (updateData.numReserved < reservationListSize) {
								updateData.numReserved++;
							} else {
								updateData.numShelved++;
							}
							updateData.numCheckedOut--;
						}
						break;

					case "deleteItem":
						if (updateData.totalStock > 0) {
							if (updateData.numShelved > 0) {
								updateData.numShelved--;
							} else if (updateData.numReserved > 0) {
								updateData.numReserved--;
							}
						}
						break;

					case "addItem":
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
						console.log(action);

						res.json("feature not yet implemented");
						break;
				}
				console.log(updateData);

				db.Medium
					.update(updateData, {
						where: { id: mediumId }
					})
					.then(data => {
						res.json("rows affected: " + data);
					});
			}); // db.medium.findAll().then()
		// }); // app.get() // comment out if using fxn
	} // function updateMediaTable(){}
};
