import React from 'react'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import './index.css'

const router=createBrowserRouter([
  {
      path:"/",
      element:<Login/>
  },
  {
      path:"/signup",
      element:<Signup/>
  },
  {
      path:"/login",
      element:<Login/>
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
