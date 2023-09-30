import { useRef, useEffect }  from 'react';
import PropTypes from "prop-types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ weather }) => {
    const chartRef = useRef(null); // Create a ref to store the chart instance
  
    const data = {
        labels: weather.length > 0 && weather.map(item => {return item.value}),
        datasets: [
          {
            data: weather.length > 0 && weather.map(item => {return item.count}),
            backgroundColor: weather.length > 0 && weather.map(item => {return item.colorCode}),
          },
        ],
      };
  
      const options = {
        title: {
          display: true,
          text: 'My Doughnut Chart',
        },
      };
  
    useEffect(() => {
      if (chartRef && chartRef.current) {
        const chartInstance = chartRef.current.chartInstance;
  
        // Check if a chart instance exists and destroy it
        if (chartInstance) {
          chartInstance.destroy();
        }
      }
    }, []);
  
    return (
        <Doughnut data={data} options={options} ref={chartRef} />
    );
  };

  DoughnutChart.propTypes = {
    weather: PropTypes.array
  };

export default DoughnutChart;