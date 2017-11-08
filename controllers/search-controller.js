var db = require("../models");

module.exports = app => {
	app.get("/search", (req, res) => {
		res.render("search");
	});
};
