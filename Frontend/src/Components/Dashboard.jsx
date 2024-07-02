import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import Sidebar from './Sidebar.jsx';
import {Line} from 'react-chartjs-2'

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


  return (
    <div className='flex'>
      <Sidebar />
      <div className='ml-8'>
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
  );
};

export default Dashboard;
