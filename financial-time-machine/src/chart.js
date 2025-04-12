// src/utils/chart.js
export const darkBackgroundPlugin = {
    id: 'darkBackground',
    beforeDraw: (chart) => {
      const ctx = chart.canvas.getContext('2d');
      ctx.save();
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };
  
  export const baseChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#f1f5f9',
        },
      },
      title: {
        display: true,
        text: '📈 6-Month Financial Projection',
        color: '#f1f5f9',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#f1f5f9',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
          color: '#f1f5f9',
          font: { weight: 'bold' },
        },
        ticks: {
          color: '#cbd5e1',
        },
        grid: {
          color: '#334155',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Net Savings (₹)',
          color: '#f1f5f9',
          font: { weight: 'bold' },
        },
        ticks: {
          color: '#cbd5e1',
        },
        grid: {
          color: '#334155',
        },
      },
    },
  };
  