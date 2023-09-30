import PropTypes from "prop-types";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DoughnutChart = ({ weather }) => {
  const data = {
    labels:
      weather.length > 0 &&
      weather.map((item) => {
        return item.value;
      }),
    datasets: [
      {
        data:
          weather.length > 0 &&
          weather.map((item) => {
            return item.count;
          }),
        backgroundColor: ["#3C50E0"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Set to false to hide the dataset label in the legend
      },
    },
  };

  return <Bar data={data} options={options} />;
};

DoughnutChart.propTypes = {
  weather: PropTypes.array,
};

export default DoughnutChart;
