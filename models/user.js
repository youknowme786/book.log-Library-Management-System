module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define(
		"User",
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false
			},

			middleName: {
				type: DataTypes.STRING,
				allowNull: true
			},

			lastName: {
				type: DataTypes.STRING,
				allowNull: false
			},

			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [10, 10],
					isNumeric: true
				}
			},

			streetAddress: {
				type: DataTypes.STRING,
				allowNull: false
			},

			city: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isAlpha: true
				}
			},

			state: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isAlpha: true
				}
			},

			zipCode: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isNumeric: true
				}
			},

			emailAddress: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: true
				}
			},

			profilePicture: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: "/assets/img/profile-img.jpg"
			}

			userType: {
				type: DataTypes.STRING,
				allowNull: false
			},

			isEmployee: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},

			createdAt: {
				type: DataTypes.DATE,
				field: "memberSince",
				defaultValue: sequelize.literal("NOW()")
			}
		},

		{
			timestamps: false
		}

		// {
		// 	timestamps: true,
		// 	createdAt: "memberSince",
		// 	updatedAt: false,
		// 	deletedAt: false
		// }
	);

	require("./js/parentAssociation.js")(User);

	// User.associate = models => {
	// 	User.hasMany(models.CheckOutHistory);
	// 	User.hasMany(models.Reservation);
	// 	User.hasMany(models.SavedItem);
	// 	User.hasMany(models.Review);
	// };

	return User;
};
