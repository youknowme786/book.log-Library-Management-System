module.exports = (sequelize, DataTypes) => {
	var Review = sequelize.define(
		"Review",
		{
			rating: {
				type: DataTypes.INTEGER,
				allowNull: false
			},

			review: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null
			}
		},

		{
			timestamps: true,
			createdAt: "timestamp",
			updatedAt: false,
			deletedAt: false
		}
	);

	Review.associate = models => {
		Review.belongsTo(models.Medium, {
			foreignKey: {
				allowNull: false
			}
		});

		Review.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Review;
};
