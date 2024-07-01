import React from 'react'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import './index.css'
import Dashboard from './Components/Dashboard.jsx'
import CreateQuiz from './Components/CreateQuiz.jsx'
import GetQuizzes from './Components/GetQuizzes.jsx'
import Quiz from './Components/AttemptQuiz.jsx'
import Result from './Components/Result.jsx'

const router=createBrowserRouter([
  {
      path:"/",
      element:<Login/>
  },
  {
      path:"/dashboard",
      element:<Dashboard/>
  }
  ,
  {
    path:"/create-quiz",
    element:<CreateQuiz/>
  },
  {
    path:"/quizzes",
    element:<GetQuizzes/>
  },
  {
    path:"/quiz/:quizId",
    element:<Quiz/>
  },
  {
    path:"/result/:resultId",
    element:<Result/>
  }

])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
