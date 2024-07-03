import { WalkingDataForm } from './pages/WalkingForm';
import { WalkingDataPayload } from './types';

export const createWalkingDataPayload = (
  data: WalkingDataForm
): WalkingDataPayload => {
  const [mm, ss] = data.duration.split(':');
  const totalSeconds = Number(mm) * 60 + Number(ss);

  return {
    duration: totalSeconds,
    distance: Number(data.distance),
    calories: data.calories ? Number(data.calories) : undefined,
    note: data.note || '',
  };
};
