import axios from 'axios';
import { useQuery } from 'react-query';
import { WalkingFormData } from '../pages/WalkingForm';

type GetWalkingStatResponse = {
  id: number;
  duration: number;
  distance: number | null;
  calories: number | null;
  note: string;
  date: string; // string ISO 8601
};

const fetchWalkingStats = async () => {
  const response = await axios.get<GetWalkingStatResponse[]>(
    'http://localhost:3001/stats'
  );
  // normalize the date strings into Date objects
  const walkingStats = response.data.map((stat) => ({
    ...stat,
    date: new Date(stat.date),
  }));

  return walkingStats;
};

export const createWalkingStat = async (walkingStat: WalkingFormData) => {
  return axios.post('http://localhost:3001/stats', walkingStat);
};

export const useGetWalkingStats = () => {
  return useQuery({
    queryKey: ['walkingStats'],
    queryFn: fetchWalkingStats,
    initialData: [],
  });
};
