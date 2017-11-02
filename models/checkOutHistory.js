module.exports = (sequelize, DataTypes) => {
	var CheckOutHistory = sequelize.define(
		"CheckOutHistory",
		{
			isCheckedOut: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},

			lateFees: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			}
		},

		{
			timestamps: true,
			createdAt: "dateCheckedOut",
			updatedAt: "dateCheckedIn",
			deletedAt: false
		}
	);

	CheckOutHistory.associate = models => {
		CheckOutHistory.belongsTo(models.Medium, {
			foreignKey: {
				allowNull: false
			}
		});

		CheckOutHistory.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return CheckOutHistory;
};
