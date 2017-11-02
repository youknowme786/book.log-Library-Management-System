module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define(
		"User",
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false
				//validation
			},

			middleName: {
				type: DataTypes.STRING,
				allowNull: true
				//validation
			},

			lastName: {
				type: DataTypes.STRING,
				allowNull: false
				//validation
			},

			userType: {
				type: DataTypes.STRING,
				allowNull: false
				//validation
			},

			phoneNumber: {
				type: DataTypes.INTEGER,
				allowNull: false
				//validation
			},

			address: {
				type: DataTypes.STRING,
				allowNull: false
				//validation
			},

			emailAddress: {
				type: DataTypes.STRING,
				allowNull: false
				//validation
			},

			isEmployee: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		},

		{
			timestamps: true,
			createdAt: "memberSince",
			updatedAt: false,
			deletedAt: false
		}
	);

	// require("./js/parentAssociation.js")(User);

	User.associate = models => {
		User.hasMany(models.CheckOutHistory);
		User.hasMany(models.Reservation);
		User.hasMany(models.SavedItem);
		User.hasMany(models.Review);
	};

	return User;
};
