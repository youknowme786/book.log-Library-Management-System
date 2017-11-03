module.exports = (sequelize, DataTypes) => {
	var SavedItem = sequelize.define("SavedItem", {
		isFavorite: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},

		isInCart: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	});

	SavedItem.associate = models => {
		SavedItem.belongsTo(models.Medium, {
			foreignKey: {
				allowNull: false
			}
		});

		SavedItem.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return SavedItem;
};
