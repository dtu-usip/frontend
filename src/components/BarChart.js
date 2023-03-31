import React from "react";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const labels = ["O", "A+", "A", "B+", "B", "C", "D", "F"];

export const data = {
  labels,
  datasets: [
    {
      label: "Actual Grade",
      data: [1, 2, 3, 4, 5, 6, 7, 10],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Scaled Grade",
      data: [1, 2, 3, 4, 5, 6, 7, 10],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
const BarChart = () => {
  return <Bar options={options} data={data} />;
};

export default BarChart;
