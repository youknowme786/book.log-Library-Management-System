module.exports = (sequelize, DataTypes) => {
	var Medium = sequelize.define(
		"Medium",
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false
			},

			mediaType: {
				type: DataTypes.STRING,
				allowNull: false
			},

			genericId: {
				type: DataTypes.STRING,
				allowNull: true
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

			reservationListSize: {
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

	require("./js/parentAssociation.js")(Medium);

	// Medium.associate = models => {
	// 	Medium.hasMany(models.CheckOutHistory);
	// 	Medium.hasMany(models.Reservation);
	// 	Medium.hasMany(models.SavedItem);
	// 	Medium.hasMany(models.Review);
	// };

	return Medium;
};
