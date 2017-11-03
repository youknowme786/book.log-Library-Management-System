module.exports = (sequelize, DataTypes) => {
	var Review = sequelize.define(
		"Review",
		{
			rating: {
				type: DataTypes.INTEGER,
				allowNull: false
			},

			review: {
				type: DataTypes.TEXT,
				allowNull: true,
				defaultValue: null
			},

			createdAt: {
				type: DataTypes.DATE,
				field: "timestamp",
				defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
			}
		},

		{
			timestamps: false
			// timestamps: true,
			// updatedAt: false,
			// deletedAt: false
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
