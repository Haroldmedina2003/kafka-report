const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Report = sequelize.define('Report', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  complaint_id: { type: DataTypes.STRING, allowNull: true },
  previous_state: { type: DataTypes.STRING, allowNull: true },
  new_state: { type: DataTypes.STRING, allowNull: true },
  changed_by: { type: DataTypes.STRING, allowNull: true },
  payload: { type: DataTypes.JSONB, allowNull: true },
  processed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  message_key: { type: DataTypes.STRING, allowNull: true, unique: true }
}, {
  tableName: 'reports',
  timestamps: false
});

module.exports = Report;
