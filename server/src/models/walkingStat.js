const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// only 'duration' and 'date' are required
const WalkingStat = sequelize.define('WalkingStat', {
  duration: {
    type: DataTypes.INTEGER, // seconds
    allowNull: false,
  },
  distance: DataTypes.FLOAT, // miles
  calories: DataTypes.FLOAT, // calories
  note: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  date: {
    type: DataTypes.STRING, // ISO 8601
    allowNull: false,
  },
});

module.exports = WalkingStat;
