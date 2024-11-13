// src/components/DataVisualization.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const DataVisualization = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/data');
      const data = await response.json();
      setChartData({
        labels: data.labels,
        datasets: [
          {
            label: 'Sample Data',
            data: data.values,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Data Visualization</h2>
      <Line data={chartData} />
    </div>
  );
};

export default DataVisualization;
