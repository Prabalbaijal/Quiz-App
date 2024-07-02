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
        console.log(response);
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

  // Ensure currentQuestion and currentQuestion.choices are not undefined
  if (!currentQuestion || !currentQuestion.choices) {
    return <div>No questions available.</div>;
  }

  const handleAnswer = (questionIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex // Store the index
    });
  };

  const handleNext = () => {
    if (answers[currentQuestionIndex] === undefined) {
      toast.error("Please mark the answer.");
    } else if (currentQuestionIndex < questions.length - 1) {
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
      console.log(response);
      navigate(`/result/${response.data.resultId}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='z-20 p-8 m-auto bg-gray-300 shadow-xl rounded-xl'>
        <h1 className='mb-6 text-4xl'>Ques.{currentQuestionIndex + 1} {currentQuestion.question}</h1>
        {/* <p className='mb-1 text-lg'>{currentQuestion.text}</p> */}
        <div className='mb-4'>
          {currentQuestion.choices.map((option, index) => (
            <div key={index}>
              <label className='flex items-start p-2 '>
                <input
                  type='radio' // Changed from checkbox to radio
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={answers[currentQuestionIndex] === index}
                  onChange={() => handleAnswer(currentQuestionIndex, index)}
                  className='radio-success radio' // Changed from checkbox to radio
                />
                {option}
              </label>
            </div>
          ))}
        </div>
        <button
          className='mt-2 text-white btn btn-active'
          onClick={handleNext}
          disabled={answers[currentQuestionIndex] === undefined} // Disable if no answer selected
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
