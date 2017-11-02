module.exports = function associateHasMany(parent) {
	parent.associate = models => {
		parent.hasMany(models.checkOutHistory);
		parent.hasMany(models.reservation);
		parent.hasMany(models.savedItem);
		parent.hasMany(models.review);
	};
};
