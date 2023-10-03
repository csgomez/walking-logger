import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useGetWalkingStats } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const Graph = () => {
  const { data: stats, isLoading, error } = useGetWalkingStats();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error getting stats from server...</p>;
  }

  if (stats === undefined) {
    return <p>Error with the walking stat data...</p>;
  }

  const graphDateLabels = stats.map((stat) => stat.date.toLocaleDateString());
  const graphDistanceData = stats.map((stat) => stat.distance);

  return (
    <Bar
      options={options}
      data={{
        labels: graphDateLabels.slice(-20),
        datasets: [
          {
            label: 'Walking Data',
            data: graphDistanceData.slice(-20),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      }}
    />
  );
};

export default Graph;
