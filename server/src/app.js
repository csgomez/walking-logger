const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const sequelize = require('./db');
const walkingStatRouter = require('./routes/walkingStatRouter');
const WalkingStat = require('./models/walkingStat');
const {
  NODE_ENV,
  parseDuration,
  parseCalories,
  parseDistance,
  sampleWalkingStats,
} = require('./utils');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/stats', walkingStatRouter);

// Use built react frontend for production
if (NODE_ENV === 'production') {
  const CLIENT_BUILD_PATH = path.join(__dirname, '../dist');

  app.use(express.static(CLIENT_BUILD_PATH));
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: CLIENT_BUILD_PATH });
  });
}

// seed sample data if in dev mode
app.startDb = async () => {
  if (NODE_ENV === 'development') {
    const initWalkingStats = sampleWalkingStats;
    const processedStats = initWalkingStats.map((stat) => ({
      ...stat,
      duration: parseDuration(stat.duration),
      distance: parseDistance(stat.distance),
      calories: parseCalories(stat.calories),
    }));

    await sequelize.sync({ force: true });
    await WalkingStat.bulkCreate(processedStats);
  } else {
    await sequelize.sync();
  }
};

app.stopDb = async () => {
  try {
    await sequelize.close();
    console.log('Sequelize successfully closed.');
  } catch (err) {
    console.error('Error closing sequelize connection:', err);
    throw err;
  }
};

module.exports = app;
