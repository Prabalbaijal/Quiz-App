  import React, { useState } from 'react';
  import axios from 'axios';
  import toast from 'react-hot-toast';
  import Sidebar from './Sidebar';
  import { useSelector } from 'react-redux';

  function CreateQuiz() {
    const { loggedinUser }=useSelector(store=>store.user)
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    const categories = ['Math', 'Science', 'Technology', 'Sports', 'History'];

    const handleAddQuestion = () => {
      const newQuestion = {
        question,
        choices,
        correctAnswer: correctAnswer
      };

      setQuestions([
        ...questions,
        newQuestion
      ]);

      // Reset the form for the next question
      setQuestion('');
      setChoices(['', '', '', '']);
      setCorrectAnswer(null);
    };
    const addAnother = () => {
      setTitle('');
      setCategory('');
      setQuestions([]);
      // Clear all the question-related state
      setQuestion('');
      setChoices(['', '', '', '']);
      setCorrectAnswer(null);
      setIsDisabled(false); // Reset disabled state for buttons
      setQuiz(null); // Clear saved quiz
    };
      
    const handleSaveQuiz = async () => {
      setIsDisabled(true);
      const newQuiz = {
        title,
        category,
        questions,
        createdBy: loggedinUser._id
      };
  
      try {
        await axios.post('http://localhost:9000/api/users/create-quiz', newQuiz, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        setQuiz(newQuiz);
        toast.success("Quiz Added Successfully.")
        setQuestions([]);
        setQuestion('');
        setChoices(['', '', '', '']);
        setCorrectAnswer(null);
      } catch (error) {
        toast.error(error.response.data.message);
        console.error(error);
        setIsDisabled(false);
      }
    };
  

    const handleChoiceChange = (index, value) => {
      const newChoices = [...choices];
      newChoices[index] = value;
      setChoices(newChoices);
    };

    const handleCorrectAnswerChange = (index) => {
      setCorrectAnswer(index);
    };

    return (
      <div className='flex'>
      <Sidebar/>
      <div className="App">
        <div className='flex-col w-[75vw] items-center text-center mt-10'>
          <div className=''><h1 className='text-4xl'>Create Quiz</h1></div>
          <div className='flex items-center justify-around pt-6'>

            <div>
              <label className="flex items-center gap-2 bg-white input input-bordered">
                Quiz Title:
                <input type="text" className="grow" placeholder="Enter Quiz Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2 bg-white">
                Category:
                <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full bg-white select-bordered select'>
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          {/* onClick={() => setShowForm(true)} */}
          <button className='mt-4 btn btn-active' disabled={isDisabled} onClick={() => document.getElementById('my_modal_3').showModal()}>Add Question</button>
        </div>
        {(
          <dialog id="my_modal_3" className="modal">
            <div className='bg-white modal-box'>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
              </form>
              <div className='mt-4'>
                <label className="flex items-center gap-2 text-lg bg-white border-black input input-bordered">
                  Question:
                  <input
                    className='w-full'
                    placeholder='Type Question Here'
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </label>
              </div>

              <div className='flex-col items-center mt-2'>
                <label className='text-lg'>Choices:</label>
                {choices.map((choice, index) => (
                  <div key={index} className=''>
                    <label>
                      <input
                      className='checkbox checkbox-success'
                        type="checkbox"
                        checked={correctAnswer === index}
                        onChange={() => handleCorrectAnswerChange(index)}
                      />
                    </label>
                    <input
                      className='max-w-xs mt-2 ml-3 bg-white border-black input input-bordered'
                      type="text"
                      placeholder={`Option ${index+1}`}
                      value={choice}
                      onChange={(e) => handleChoiceChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className='flex justify-end'>
              <button onClick={handleAddQuestion} className='mt-4 btn btn-active'>Save Question</button>
              </div>
            </div>
          </dialog>
        )}

        {questions.length > 0 && (
          <div className='flex flex-col ml-4'>
            <h2 className='mb-4 text-2xl'>Questions</h2>
            <ul>
              {questions.map((q, index) => (
                <li key={index}>
                  <span className='w-auto p-1 mb-1 font-bold bg-gray-300 rounded-lg'>Question: {q.question}</span>
                  <ul>
                    {q.choices.map((choice, i) => (
                      <li key={i}>Option {i+1}: {choice}</li>
                    ))}
                  </ul>
                  <p><strong>Correct Answer:</strong> Option {q.correctAnswer+1}</p>
                </li>
              ))}
            </ul>
            <div className='flex justify-center mb-4'><button onClick={handleSaveQuiz} className=' btn btn-active'>Save and Post Quiz</button></div>
          </div>
        )}

        {quiz && (
          <div className='flex flex-col ml-4'>
            <span className='text-lg bg-gray-300 w-[7vw] pl-2 mb-4 rounded-md'>Saved Quiz</span>
            <h3 className='flex justify-around mb-4 text-lg'><div>Quiz Title: {quiz.title}</div>  <div>Category: {quiz.category}</div></h3>
            <ul>
              {quiz.questions.map((q, index) => (
                <li key={index}>
                  <span className='w-auto p-1 mb-1 font-bold bg-gray-300 rounded-lg'>Question {index+1}: {q.question}</span>
                  <ul>
                    {q.choices.map((choice, i) => (
                      <li key={i}>Option {i+1}: {choice}</li>
                    ))}
                  </ul>
                  <p><strong>Correct Answer:</strong> Option {q.correctAnswer+1}</p>
                </li>
              ))}
            </ul>
            <div className='flex justify-center'><button className='btn btn-active' onClick={addAnother}>Add New Quiz</button></div>
          </div>
        )}
      </div>
      </div>
    );
  }

  export default CreateQuiz
