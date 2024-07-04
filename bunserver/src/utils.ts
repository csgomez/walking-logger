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
