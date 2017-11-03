var db = require("../models");

// make sure date format matches createdAt field

module.exports = app => {
	// POST route for adding a new book
	// CURL command:
	// curl -H "Content-Type: application/json" -X POST -d '{"title": "the chronicle of imran", "mediaType": "book", "genericId":"9780470199480", "totalStock":5}' http://localhost:3000/api/media/new
	app.post("/api/media/new", (req, res) => {
		console.log(req.body);

		var genericIdInput = req.body.genericId.trim();
		if (genericIdInput === "") {
			genericIdInput = null;
		}

		// var numReservedInput = req.body.numReserved.trim();
		// if (numReservedInput === "") {
		// 	numReservedInput === 0;
		// }

		// var waitlistSizeInput = numReservedInput;

		//update to work for multiple books using an array of cartBooks and forEach
		db.Medium
			.create({
				title: req.body.title.trim(),
				mediaType: req.body.mediaType,
				genericId: genericIdInput,
				totalStock: parseInt(req.body.totalStock, 10)
			})
			.then(data => {
				res.json(data);
			});
	});
};
