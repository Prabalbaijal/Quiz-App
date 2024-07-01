import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

function Quiz() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const loadingToastId = toast.loading('Loading questions...');
      try {
        const response = await axios.get(`http://localhost:9000/api/users/${quizId}/questions`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        console.log(response)
        setQuestions(response.data); 

        toast.dismiss(loadingToastId);
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Something went wrong!");
      }
    };

    fetchQuestions();
  }, [quizId]);


  const currentQuestion = questions[currentQuestionIndex];

  // Ensure currentQuestion and currentQuestion.options are not undefined
  if (!currentQuestion || !currentQuestion.choices) {
    return <div>No questions available.</div>;
  }

  const handleAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    try {
      const response = await axios.post(`http://localhost:9000/api/users/${quizId}/submit`, {
        answers
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      // Navigate to the result page with the result ID
      navigate(`/result/${response.data.resultId}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className='quiz-container'>
      <h1 className='mb-6 text-4xl'>{currentQuestion.question}</h1>
      {/* <p className='mb-1 text-lg'>{currentQuestion.text}</p> */}
      <div className='mb-4'>
        {currentQuestion.choices.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type='radio'
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={answers[currentQuestionIndex] === index}
                onChange={() => handleAnswer(currentQuestionIndex, option)}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
      <button className='mt-2 btn btn-active' onClick={handleNext}>
        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
      </button>
    </div>
  );
}

export default Quiz;
