import React from 'react'
import Sidebar from './Sidebar'
import CreateQuiz from './CreateQuiz'

function Dashboard() {
  return (
    <div className='flex'>
      <Sidebar/>
      <CreateQuiz/>
    </div>
  )
}

export default Dashboard
