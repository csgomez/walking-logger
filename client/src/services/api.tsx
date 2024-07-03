import axios from 'axios';
import { useQuery } from 'react-query';
import { WalkingDataPayload } from '../types';

type GetWalkingDataResponse = {
  id: number;
  duration: number;
  distance: number | null;
  calories: number | null;
  note: string;
  date: string; // string ISO 8601
};

const backendURL = 'http://localhost:3001';
const statsURL = `${backendURL}/stats`;

const fetchWalkingStats = async () => {
  const response = await axios.get<GetWalkingDataResponse[]>(statsURL);
  // normalize the date strings into Date objects
  const walkingStats = response.data.map((stat) => ({
    ...stat,
    date: new Date(stat.date),
  }));

  return walkingStats;
};

export const createWalkingStat = async (payload: WalkingDataPayload) => {
  return axios.post(statsURL, payload);
};

export const useGetWalkingStats = () => {
  return useQuery({
    queryKey: ['walkingStats'],
    queryFn: fetchWalkingStats,
    initialData: [],
  });
};

export const fetchWalkingStatsFile = async () => {
  return axios.get('http://localhost:3001/data', {
    responseType: 'blob',
  });
};
