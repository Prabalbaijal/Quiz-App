import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';

function GetQuizzes({ triggerFetch }) {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuizzes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:9000/api/users/quizzes', {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      setQuizzes(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [triggerFetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-[75vw] p-4'>
        <h1 className='mb-6 text-4xl'>All Quizzes</h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {quizzes.map((quiz) => (
            <div key={quiz._id} className='p-4 border rounded shadow'>
              <h2 className='mb-2 text-2xl'>{quiz.title}</h2>
              <p className='mb-1 text-lg'><strong>Category:</strong> {quiz.category}</p>
              <p className='mb-1 text-lg'><strong>Created By:</strong> {quiz.createdBy.firstName} {quiz.createdBy.lastName}</p>
              <button className='mt-2 btn btn-active'>Start Quiz</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetQuizzes;
