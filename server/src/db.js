const path = require('path');
const { Sequelize } = require('sequelize');
const { NODE_ENV } = require('./utils');

const DB_FILE_FILENAME = 'walking_data.sqlite';
const DB_FILE_PATH = path.join(__dirname, '../data/', DB_FILE_FILENAME);

const developmentConfig = {
  dialect: 'sqlite',
  storage: ':memory:',
};

const productionConfig = {
  dialect: 'sqlite',
  storage: DB_FILE_PATH,
  logging: false,
};

const sequelize = new Sequelize(
  NODE_ENV === 'development' ? developmentConfig : productionConfig
);

module.exports = sequelize;
