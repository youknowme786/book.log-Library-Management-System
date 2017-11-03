module.exports = function associateHasMany(parent) {
	parent.associate = models => {
		parent.hasMany(models.CheckOutHistory);
		parent.hasMany(models.Reservation);
		parent.hasMany(models.Favorite);
		parent.hasMany(models.Review);
	};
};
