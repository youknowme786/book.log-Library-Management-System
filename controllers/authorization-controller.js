var db = require("../models");

module.exports = app => {
	//TEST ROUTE
	app.get("/api/test", (req, res) => {
		console.log(req.user);
		res.json(req.user);
	});
};
