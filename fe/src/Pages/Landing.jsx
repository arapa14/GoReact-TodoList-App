import React from 'react'
import { useNavigate } from 'react-router-dom'

function Landing() {
    const navigate = useNavigate();

  return (
    <>
        <h1>Todo List App</h1>
        <h2>Go React</h2>
        <button onClick={() => navigate("/login")}>Get Started</button>
    </>
  )
}

export default Landing
