module.exports = populateDatabaseInformation () => {

app.get("/api/media/:industryIdentifier?", (req, res) => {
		var query = {};
		if (req.params.industryIdentifier) {
			query.industryIdentifier = req.params.industryIdentifier;
		}

		db.Medium
			.findAll({
				where: query
			})
			.then(data => {
				res.json(data);
			});
	});
};