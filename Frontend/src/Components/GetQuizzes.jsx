import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function GetQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    const loadingToastId = toast.loading('Loading quizzes...');
    try {
      const response = await axios.get('http://localhost:9000/api/users/quizzes', {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      setQuizzes(response.data);
      toast.dismiss(loadingToastId);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const startQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='w-[75vw] p-4 overflow-auto'>
        <h1 className='mb-6 text-4xl'>All Quizzes</h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {quizzes.map((quiz) => (
            <div key={quiz._id} className='p-4 border rounded shadow'>
              <h2 className='mb-2 text-2xl'>{quiz.title}</h2>
              <p className='mb-1 text-lg'><strong>Category:</strong> {quiz.category}</p>
              <p className='mb-1 text-lg'><strong>Created By:</strong> {quiz.createdBy.firstName} {quiz.createdBy.lastName}</p>
              <button className='mt-2 btn btn-active' onClick={() => startQuiz(quiz._id)}>Start Quiz</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetQuizzes;
