module.exports = (sequelize, DataTypes) => {
	var Reservation = sequelize.define(
		"Reservation",
		{},
		{
			timestamps: true,
			createdAt: "dateReserved",
			updatedAt: false,
			deletedAt: false
		}
	);

	Reservation.associate = models => {
		Reservation.belongsTo(models.Media, {
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
