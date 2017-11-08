var db = require("../models");
var deleteRowFromTable = require("./updateMediaExport.js").deleteRowFromTable;

module.exports = app => {
	//FAVORITES ROUTES
	// //GET - using userId
	// //CURL command:
	// //curl -i http://localhost:3000/api/2/favorites
	// app.get("/api/:UserId/favorites", (req, res) => {
	// 	db.Favorite
	// 		.findAll({
	// 			where: { UserId: req.params.userId }
	// 		})
	// 		.then(data => {
	// 			res.json(data);
	// 			// res.render(/*some file*/, data);
	// 		});
	// });

	//POST - favorite item
	//CURL command:
	//curl -H "Content-Type: application/json" -X POST -d '{"MediumId": 1, "UserId": 1}' http://localhost:3000/api/favorites/create
	app.post("/api/favorites/create", (req, res) => {
		db.Favorite
			.create({
				MediumId: req.body.mediumId,
				UserId: req.body.userId
			})
			.then(data => {
				console.log("FAVORITE ADDED");
				res.json(data);
			});
	});

	//DELETE - favorite item - see generic delete route
	app.delete("/api/favorites/:userId/delete/:mediumId", (req, res) => {
		Promise.resolve(() => {
			return deleteRowFromTable(
				"favorites",
				req.params.userId,
				req.params.mediumId
			);
		}).then(data => {
			res.json(data);
		});
	});
};
