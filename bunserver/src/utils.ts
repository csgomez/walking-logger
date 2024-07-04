import fs from 'node:fs';
import path from 'node:path';

/**
 * Returns a filename in the form `WalkingData_YYYY-MM-DD.json`
 */
export const getWalkingStatsFileName = () => {
  const now = new Date();

  const dayString = now.getDate().toString().padStart(2, '0');
  const monthString = (now.getMonth() + 1).toString().padStart(2, '0');
  const yearString = now.getFullYear().toString();

  const dateString = `${yearString}-${monthString}-${dayString}`;

  const fileName = `WalkingData_${dateString}.json`;

  return fileName;
};

export const sampleWalkingStats = [
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
  {
    id: 4,
    duration: '25:12',
    distance: '1.100',
    calories: '150.0',
    date: '2024-04-02T00:00:00.000Z',
  },
  {
    id: 5,
    duration: '28:36',
    distance: '1.300',
    calories: '175.0',
    date: '2024-04-03T00:00:00.000Z',
  },
  {
    id: 6,
    duration: '30:20',
    distance: '1.400',
    calories: '185.0',
    date: '2024-04-04T00:00:00.000Z',
  },
  {
    id: 7,
    duration: '26:45',
    distance: '1.200',
    calories: '160.0',
    date: '2024-04-05T00:00:00.000Z',
  },
  {
    id: 8,
    duration: '29:55',
    distance: '1.350',
    calories: '180.0',
    date: '2024-04-06T00:00:00.000Z',
  },
];
