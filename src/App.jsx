import React from 'react'
import TodoList from './features/todos/TodoList'
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <>
     <TodoList/>
     <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}

export default App
