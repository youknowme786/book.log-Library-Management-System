module.exports = (sequelize, DataTypes) => {
	var Reservation = sequelize.define(
		"Reservation",
		{
			createdAt: {
				type: DataTypes.DATE,
				field: "dateCheckedOut",
				defaultValue: sequelize.literal("NOW()")
			}
		},
		{
			timestamps: false
		}
	);

	Reservation.associate = models => {
		Reservation.belongsTo(models.Medium, {
			foreignKey: {
				allowNull: false
			}
		});

		Reservation.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Reservation;
};
