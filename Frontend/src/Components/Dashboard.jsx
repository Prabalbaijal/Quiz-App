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
  const scores = quizzesTaken.map(quiz => (quiz.score / 100).toFixed(2));

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Scores',
        data: scores,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return (value * 100) + '%';
          },
        },
      },
    },
  };

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex flex-col w-full p-4'>
        <h2 className='mb-4 text-2xl font-bold'>Dashboard</h2>
        <div className='flex flex-col gap-4 lg:flex-row'>
          <div className='flex-grow lg:w-1/2'>
            <div className='overflow-y-auto max-h-[70vh]'>
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
          <div className='flex flex-col items-center flex-grow lg:w-1/2'>
            <Line data={data} options={options} />
            <h1 className='mt-4 text-xl font-bold'>Your Performance</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
