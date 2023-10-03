import dayjs from 'dayjs';
import { useGetWalkingStats } from '../services/api';

type WalkingStat = {
  id: number;
  duration: number; // int seconds
  distance: number | null; // float miles
  calories: number | null; // float calories
  note: string; // empty string default ''
  date: Date;
};

const History = () => {
  const { data: stats, isLoading, error } = useGetWalkingStats();

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error getting stats from server...</p>;
  }

  return (
    <div className="history-page">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Duration</th>
            <th scope="col">Distance</th>
            <th scope="col">Calories</th>
          </tr>
        </thead>
        <tbody>
          {stats !== undefined &&
            stats.map((stat) => <WalkingStatEntry key={stat.id} stat={stat} />)}
        </tbody>
      </table>
    </div>
  );
};

type WalkingStatEntryProps = {
  stat: WalkingStat;
};

const WalkingStatEntry = ({ stat }: WalkingStatEntryProps) => {
  const formattedDate = dayjs(stat.date).format('MM/DD/YYYY');

  const formattedDuration = () => {
    const minutes = Math.floor(stat.duration / 60);
    const seconds = stat.duration % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const formattedDistance = stat.distance?.toFixed(3);
  const formattedCalories = stat.calories?.toFixed(1);

  return (
    <tr>
      <th scope="row">{formattedDate}</th>
      <th>{formattedDuration()}</th>
      <th>{formattedDistance}</th>
      <th>{formattedCalories}</th>
    </tr>
  );
};

export default History;
