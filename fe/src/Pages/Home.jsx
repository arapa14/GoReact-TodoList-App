import React from 'react'

function Home() {
    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

  return (
    <>
        <h1>ini home wak</h1>
        <button onClick={logout}>Logout</button>
    </>
  )
}

export default Home
