module.exports = function(sequelize, DataTypes) {
  const Test = sequelize.define(
    "Test",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        field: "id"
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        type: DataTypes.DATE,
        field: "dateupdated",
        defaultValue: sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        )
      }
    },
    {
      timestamps: true,
      tableName: "t_test",
      paranoid: true,
      underscored: true
    }
  );
  return Test;
};
