import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  import { Line } from 'react-chartjs-2';
  import { darkBackgroundPlugin, baseChartOptions } from '../utils/chart';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    darkBackgroundPlugin // ✅ Register the plugin
  );
  
  // Example:
  const chartData = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Projected Net Savings (₹)',
        data: [3000, 5000, 7000, 9000, 11000, 13000],
        borderColor: '#38bdf8',
        backgroundColor: '#0ea5e9',
        tension: 0.3,
      },
    ],
  };
  
  const chartOptions = {
    ...baseChartOptions,
  };
  
  export default function ProjectionChart() {
    return <Line data={chartData} options={chartOptions} />;
  }
  