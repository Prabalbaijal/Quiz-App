import React, { useState } from 'react';
import axios from 'axios';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState(null);

  const categories = ['Math', 'Science', 'Technology', 'Sports', 'History'];

  const handleAddQuestion = () => {
    const newQuestion = {
      question,
      choices,
      correctAnswer: choices[correctAnswer]
    };

    setQuestions([
      ...questions,
      newQuestion
    ]);

    // Reset the form for the next question
    setShowForm(false);
    setQuestion('');
    setChoices(['', '', '', '']);
    setCorrectAnswer(null);
  };

  const handleSaveQuiz = async () => {
    const newQuiz = {
      title,
      category,
      questions,
    };

    try {
      await axios.post('http://localhost:9000/api/users/create-quiz', newQuiz, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      setQuiz(newQuiz);

      // Reset the form for a new quiz
      setTitle('');
      setCategory('');
      setQuestions([]);
    } catch (error) {
      console.error('Error adding quiz', error);
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
    <div className="App">
      <h1>Create Quiz</h1>
      
      <div>
        <label>
          Quiz Title:
          <input
            className='w-full max-w-xs bg-white input input-bordered'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='bg-white'>
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
      </div>

      <button onClick={() => setShowForm(true)}>Add Question</button>

      {showForm && (
        <div>
          <div>
            <label>
              Question:
              <input
              className='w-full max-w-xs bg-white input input-bordered'
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>Choices:</label>
            {choices.map((choice, index) => (
              <div key={index}>
                <input
                className='w-full max-w-xs bg-white input input-bordered'
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={correctAnswer === index}
                    onChange={() => handleCorrectAnswerChange(index)}
                  />
                  Correct Answer
                </label>
              </div>
            ))}
          </div>

          <button onClick={handleAddQuestion}>Save Question</button>
        </div>
      )}

      {questions.length > 0 && (
        <div>
          <h2>Questions</h2>
          <ul>
            {questions.map((q, index) => (
              <li key={index}>
                <p>{q.question}</p>
                <ul>
                  {q.choices.map((choice, i) => (
                    <li key={i}>{choice}</li>
                  ))}
                </ul>
                <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleSaveQuiz}>Save Quiz</button>
        </div>
      )}

      {quiz && (
        <div>
          <h2>Saved Quiz</h2>
          <h3>{quiz.title} - {quiz.category}</h3>
          <ul>
            {quiz.questions.map((q, index) => (
              <li key={index}>
                <p>{q.question}</p>
                <ul>
                  {q.choices.map((choice, i) => (
                    <li key={i}>{choice}</li>
                  ))}
                </ul>
                <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CreateQuiz
