const NODE_ENV = process.env.NODE_ENV;

// 'mm:ss'
const parseDuration = (duration) => {
  const [minutes, seconds] = duration.split(':');
  const minutesInSeconds = parseInt(minutes) * 60;

  return minutesInSeconds + parseInt(seconds);
};

// returns null if distance isn't provided
const parseDistance = (distance) => {
  if (distance === undefined) return null;

  return parseFloat(distance);
};

// returns null if calories isn't provided
const parseCalories = (calories) => {
  if (calories === undefined) return null;

  return parseFloat(calories);
};

const sampleWalkingStats = [
  {
    id: 1,
    duration: '40:00',
    distance: '1.500',
    calories: '245.3',
    date: '2023-09-20T05:00:00.000Z',
  },
  {
    id: 2,
    duration: '15:20',
    distance: '0.650',
    calories: '89.0',
    date: '2023-09-23T05:00:00.000Z',
  },
  {
    id: 3,
    duration: '31:45',
    distance: '1.370',
    calories: '190.0',
    date: '2023-09-24T05:00:00.000Z',
  },
];

// Returns a filename in the form `WalkingLogger-data_YYYY-MM-DD.json`
const getWalkingStatsFileName = () => {
  const now = new Date();

  const dayString = now.getDate().toString().padStart(2, '0');
  const monthString = (now.getMonth() + 1).toString().padStart(2, '0');
  const yearString = now.getFullYear().toString();

  const dateString = `${yearString}-${monthString}-${dayString}`;

  const fileName = `WalkingLogger-data_${dateString}.json`;

  return fileName;
};

module.exports = {
  NODE_ENV,
  parseDuration,
  parseDistance,
  parseCalories,
  sampleWalkingStats,
  getWalkingStatsFileName,
};
