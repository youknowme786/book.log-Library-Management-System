module.exports = (sequelize, DataTypes) => {
	var Favorite = sequelize.define(
		"Favorite",
		{},
		{
			timestamps: false
		}
	);

	Favorite.associate = models => {
		Favorite.belongsTo(models.Medium, {
			foreignKey: {
				allowNull: false
			}
		});

		Favorite.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Favorite;
};
