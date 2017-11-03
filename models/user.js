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
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [10, 10],
					isNumeric: true
				}
				//validation
			},

			streetAddress: {
				type: DataTypes.STRING,
				allowNull: false
				//validation
			},

			city: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isAlpha: true
				}
				//validation
			},

			state: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isAlpha: true
				}
				//validation
			},

			zipCode: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isNumeric: true
				}
				//validation
			},

			emailAddress: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: true
				}
				//validation
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
