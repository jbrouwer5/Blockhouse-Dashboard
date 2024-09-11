// /src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCandlestickData, fetchLineChartData, fetchBarChartData, fetchPieChartData } from '../redux/chartSlice';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, 
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  TimeScale,
  TimeSeriesScale
} from 'chart.js';
import 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import { Bar, Line, Pie, Chart } from 'react-chartjs-2';
import { OhlcElement, OhlcController,  CandlestickController, CandlestickElement, } from 'chartjs-chart-financial';

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, 
  Title,
  Tooltip,
  Legend,
  TimeScale,
  LineElement,
  PointElement,
  OhlcElement,
  CandlestickController, 
  CandlestickElement, 
  OhlcController,
  TimeSeriesScale
);

// The candlestick chart component 
const CandlestickChart = () => {
    const { candlestickData } = useAppSelector((state) => state.charts);

    if (!candlestickData) {
        return <div className="flex justify-center items-center text-xl font-semibold">Loading...</div>;
    }

    return (
        <Chart
            type="candlestick"
            data={{
            labels: candlestickData.labels,
            datasets: [{
                label: 'Candlestick',
                data: candlestickData.data.map((item: any) => ({
                x: new Date(item.date),
                o: item.open,
                h: item.high,
                l: item.low,
                c: item.close,
                })),
                barThickness: 'flex',
            }],
            }}
            options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'MMM dd, yyyy',
                    displayFormats: { day: 'MMM yyyy' },
                },
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.2)' },
                },
            },
            plugins: {
                legend: { display: false },
            },
            }}
        />
    )
}

// The line chart component 
const LineChart = () => {
    const { lineChartData } = useAppSelector((state) => state.charts);

    if (!lineChartData) {
        return <div className="flex justify-center items-center text-xl font-semibold">Loading...</div>;
    }

    return (
        <Line
              data={{
                labels: lineChartData.labels,
                datasets: [
                  {
                    label: 'Line Chart',
                    data: lineChartData.data,
                    borderColor: 'rgba(75,192,192,1)',
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
              }}
            />
    )
}

// The bar chart component 
const BarChart = () => {
    const { barChartData } = useAppSelector((state) => state.charts);

    if (!barChartData) {
        return <div className="flex justify-center items-center text-xl font-semibold">Loading...</div>;
    }

    return (
        <Bar
        data={{
            labels: barChartData.labels,
            datasets: [
            {
                label: 'Bar Chart',
                data: barChartData.data,
                backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)'],
            },
            ],
        }}
        options={{
            maintainAspectRatio: false,
            plugins: {
            legend: { onClick: () => {} },
            },
        }}
        />
    )
}

// The pie chart component 
const PieChart =() => {
    const { pieChartData } = useAppSelector((state) => state.charts);

    if (!pieChartData) {
        return <div className="flex justify-center items-center text-xl font-semibold">Loading...</div>;
    }

    return (
        <Pie
            data={{
            labels: pieChartData.labels,
            datasets: [
                {
                label: 'Pie Chart',
                data: pieChartData.data,
                backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)'],
                },
            ],
            }}
            options={{ maintainAspectRatio: false }}
        />
    )
}

// interface for ChartCard to wrap each chart type
interface ChartCardProps {
  title: string;
  ChartComponent: React.FC;
  darkMode: boolean;
}

// Wraps each chart type in a card
const ChartCard: React.FC<ChartCardProps> = ({ title, ChartComponent, darkMode }) => {
  return ( 
    
    <div className={darkMode ? "bg-gray-800 p-6 rounded-lg shadow-lg" : "bg-white p-8 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105"} >
      <h2 className={`text-2xl font-semibold mb-${darkMode ? 4 : 4} text-center ${darkMode ? '' : 'text-gray-700'}`}> {title}</h2>
      
      <div className="h-[85%]">
        <ChartComponent />
      </div>
    </div>
  );
};

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
      dispatch(fetchCandlestickData());
      dispatch(fetchLineChartData());
      dispatch(fetchBarChartData());
      dispatch(fetchPieChartData());
    }, [dispatch]);

    const toggleDarkMode = () => {
      setDarkMode((prevMode) => !prevMode);
    };

    return (
      <div className={`min-h-screen p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center">Blockhouse Financials Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className={`py-2 px-4 rounded-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChartCard title="Candlestick Chart" ChartComponent={CandlestickChart} darkMode={darkMode} />
          <ChartCard title="Line Chart" ChartComponent={LineChart} darkMode={darkMode} />
          <ChartCard title="Bar Chart" ChartComponent={BarChart} darkMode={darkMode}/>
          <ChartCard title="Pie Chart" ChartComponent={PieChart} darkMode={darkMode}/>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
