const router = require('express').Router();
const WalkingStat = require('../models/walkingStat');
const { parseDuration, parseDistance, parseCalories } = require('../utils');

// returns all the WalkingStat records in the database
router.get('/', async (req, res) => {
  try {
    const storedWalkingStats = await WalkingStat.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(storedWalkingStats);
  } catch (err) {
    console.error('Error fetching all walking stats:', err);
    return res.status(500).json({
      error: {
        message: 'Server error fetching all walking stats.',
      },
    });
  }
});

// inserts a new WalkingStat record into the database
router.post('/', async (req, res) => {
  // all these values are strings, must be parsed first
  const { duration, distance, calories, note, date } = req.body;

  if (!duration || !date) {
    return res.status(400).json({
      error: {
        message: 'Duration or date missing.',
      },
    });
  }

  const durationVal = parseDuration(duration);
  const distanceVal = parseDistance(distance);
  const caloriesVal = parseCalories(calories);

  try {
    const newStat = await WalkingStat.create({
      duration: durationVal,
      distance: distanceVal,
      calories: caloriesVal,
      note,
      date,
    });

    return res.status(201).json(newStat);
  } catch (err) {
    console.error('Error storing new walking stat:', err);
    return res.status(500).json({
      error: {
        message: 'Server error when storing new stat.',
      },
    });
  }
});

module.exports = router;
