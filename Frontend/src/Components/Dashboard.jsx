import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar.jsx';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [quizzesTaken, setQuizzesTaken] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/users/dashboard', {
          withCredentials: true,
        });
        setQuizzesTaken(response.data.quizzesTaken);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, []);

  const labels = quizzesTaken.map((quiz, index) => `Quiz ${index + 1}`);
  const scores = quizzesTaken.map(quiz => (quiz.score / 100).toFixed(2));  // Convert scores to percentage format

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Scores',
        data: scores,
        fill: true,  // This fills the area under the line
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color of the filled area
        borderColor: 'rgba(255, 99, 132, 1)', // Color of the line
        tension: 0.4,  // This makes the line curved
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return (value * 100) + '%';  // Convert ticks to percentage format
          },
        },
      },
    },
  };

  return (
    <div className='flex pr-4'>
      <Sidebar />
      <div className='flex w-[40vw] justify-center'>
        <div className='flex flex-col items-center justify-center h-[90vh] overflow-auto'>
          <h2 className='mb-4 text-2xl font-bold'>Dashboard</h2>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>Quiz Title</th>
                <th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>Score</th>
                <th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>Date Taken</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {quizzesTaken.map((quiz, index) => (
                <tr key={index}>
                  <td className='px-6 py-4 whitespace-nowrap'>{quiz.quizTitle}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{quiz.score}%</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{new Date(quiz.dateTaken).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='w-[40vw] ml-0 flex items-center'>
        <Line data={data} options={options}/>
      </div>
    </div>
  );
};

export default Dashboard;
