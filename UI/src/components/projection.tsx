'use client';
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
/* eslint-disable */



import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


// Sample projection data, can be replaced with dynamic backend data later
const generateChartData = () => {
  return {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [
      {
        label: 'Projected Net Savings (₹)',
        data: [3000, 7000, 12000, 18000, 25000],
        borderColor: '#7ef9e3',
        backgroundColor: '#9985ff',
        tension: 0.4,
      },
    ],
  };
};


const chartOptions = {
  responsive: true,
  plugins: {
    legend: { labels: { color: '#ffffff' } },
    title: { display: true, text: '5-Year Financial Projection', color: '#ffffff' },
  },
  scales: {
    x: { ticks: { color: '#aaa' } },
    y: { ticks: { color: '#aaa' } },
  },
};


export default function ProjectionChart() {
  const [chartData, setChartData] = useState(generateChartData());


  useEffect(() => {
    // Hook into backend data here later
  }, []);


  return (
    <div className="bg-black p-4 rounded-lg w-full max-w-2xl shadow-inner">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}





