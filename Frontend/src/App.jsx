import React from 'react'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import './index.css'
import Dashboard from './Components/Dashboard.jsx'
import CreateQuiz from './Components/CreateQuiz.jsx'

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
    path:"create-quiz",
    element:<CreateQuiz/>
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
