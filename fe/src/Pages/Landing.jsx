import React from 'react'
import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-blue-300 p-6">
      <h1 className="text-5xl font-bold mb-4 text-blue-900">Todo List App</h1>
      <h2 className="text-2xl mb-8 text-blue-800">Organize your tasks with ease</h2>
      <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Get Started
      </button>
    </div>
  )
}

export default Landing