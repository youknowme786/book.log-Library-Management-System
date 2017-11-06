module.exports = (sequelize, DataTypes) => {
	var Medium = sequelize.define(
		"Medium",
		{
			mediaType: {
				type: DataTypes.STRING,
				allowNull: false
			},

			industryIdentifier: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isAlphanumeric: true
				},
				defaultValue: null
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

			reservationListSize: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},

			numCheckedOut: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},

			totalNumCheckouts: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},

			title: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null
			},

			author: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null
			},

			summary: {
				type: DataTypes.TEXT,
				allowNull: true,
				defaultValue: null
			},

			image: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "/assets/img/placeholder.gif"
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
	);

	require("./js/parentAssociation.js")(Medium);

	return Medium;
};
