module.exports = (sequelize, DataTypes) => {
	var CheckOutHistory = sequelize.define(
		"CheckOutHistory",
		{
			isCheckedOut: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},

			createdAt: {
				type: DataTypes.DATE,
				field: "dateCheckedOut",
				defaultValue: sequelize.literal("NOW()")
			},

			updatedAt: {
				type: DataTypes.DATE,
				field: "dateCheckedIn",
				allowNull: true
			},

			lateFees: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0
			}
		},

		{
			timestamps: false
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
