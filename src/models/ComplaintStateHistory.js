module.exports = (sequelize, DataTypes) => {
  const ComplaintStateHistory = sequelize.define(
    "ComplaintStateHistory",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      complaint_id: { type: DataTypes.BIGINT, allowNull: false },
      entity_name: { type: DataTypes.STRING, allowNull: false },
      complaint_description: { type: DataTypes.TEXT, allowNull: false },
      previous_state: { type: DataTypes.STRING, allowNull: true },
      new_state: { type: DataTypes.STRING, allowNull: true },
      user_email: { type: DataTypes.STRING, allowNull: false },
      change_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "ComplaintStateHistories",
      schema: "historical_data",
      timestamps: false,
    }
  );
  return ComplaintStateHistory;
};
