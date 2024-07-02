import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Result() {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const loadingToastId = toast.loading('Loading result...');
      try {
        const response = await axios.get(`http://localhost:9000/api/users/results/${resultId}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        console.log(response)
        setResult(response.data);
        toast.dismiss(loadingToastId);
      } catch (error) {
        console.error("Error fetching result:", error);
        toast.error("Something went wrong!");
      }
    };

    fetchResult();
  }, [resultId]);

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className='result-container'>
      <h1 className='mb-6 text-4xl'>Quiz Result</h1>
      <p className='mb-4 text-lg'>Quiz Title: {result.quizId.title}</p>
      <p className='mb-4 text-lg'>Score: {result.score}%</p>
      <p className='mb-4 text-lg'>Correct Answers: {result.correctAnswers}</p>
      <p className='mb-4 text-lg'>Date Taken: {new Date(result.dateTaken).toLocaleString()}</p>
      <Link to="/quizzes" className='mt-4 btn btn-active'>Back to Quizzes</Link>
    </div>
  );
}

export default Result;
