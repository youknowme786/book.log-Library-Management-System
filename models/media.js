module.exports = (sequelize, DataTypes) => {
	var Media = sequelize.define(
		"Media",
		{
			// do we need any validation?
			mediaType: {
				type: DataTypes.STRING,
				allowNull: false
			},

			genericId: {
				type: DataTypes.STRING
			},

			totalStock: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},

			numShelved: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},

			numReserved: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},

			numCheckedOut: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},

			waitlistSize: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},

			totalNumCheckouts: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},

			createdAt: {
				type: DataTypes.DATE,
				field: "firstArrivalDate",
				defaultValue: sequelize.literal("NOW()")
			}
		},

		{
			timestamps: false
		}

		// {
		// 	timestamps: true,
		// 	createdAt: "firstArrivalDate",
		// 	updatedAt: false,
		// 	deletedAt: false
		// }
	);

	console.log("DATE RIGHT NOW " + Date.now());

	// require("./js/parentAssociation.js")(Media);

	Media.associate = models => {
		Media.hasMany(models.CheckOutHistory);
		Media.hasMany(models.Reservation);
		Media.hasMany(models.SavedItem);
		Media.hasMany(models.Review);
	};

	return Media;
};
