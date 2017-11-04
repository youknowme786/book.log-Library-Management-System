var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/test", function(req, res) {

	db.Medium.findAll()
		.then(function(dbBook) {
			console.log(dbBook);
			var hbsObject = { book: dbBook };
			return res.render("test", hbsObject);
		});
});

console.log(db.Medium)

module.exports = router;