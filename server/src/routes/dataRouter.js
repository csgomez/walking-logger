const WalkingStat = require('../models/walkingStat');
const { getWalkingStatsFileName } = require('../utils');
const path = require('path');
const fs = require('fs-extra');

const router = require('express').Router();

// Returns a json file containing all the WalkingStats
router.get('/', async (req, res) => {
  try {
    const walkingStats = await WalkingStat.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    // Transform ISO8601 date string to localDateStrings
    for (let i = 0; i < walkingStats.length; i++) {
      const localeDateString = new Date(
        walkingStats[i].date
      ).toLocaleDateString();
      walkingStats[i].date = localeDateString;
    }

    const serializedWalkingStats = JSON.stringify(walkingStats, null, 2);

    const fileName = getWalkingStatsFileName();
    const filePath = path.join(__dirname, '../../tmp', fileName);

    await fs.writeFile(filePath, serializedWalkingStats);

    // https://github.com/eligrey/FileSaver.js/wiki/Saving-a-remote-file#using-http-header
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8');
    res.setHeader('X-Filename', fileName);

    return res.sendFile(filePath, fileName);
  } catch (err) {
    console.error('Error generating json file with all the data:', err);
    return res.status(500).json({
      error: {
        message: 'Server error generating json file with walking stats.',
      },
    });
  }
});

module.exports = router;
