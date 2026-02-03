import React, { useEffect, useState } from 'react'
import { getMe } from '../Services/AuthService';

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getMe()
        setUser(res.data) // sesuai response backend kamu
      } catch (err) {
        console.error(err)
        localStorage.removeItem('token')
        window.location.href = '/login'
      } finally {
        setLoading(false)
      }
    }

    fetchMe()
  }, []);


  if (loading) return <p>Loading...</p>

  return (
    <>
      <h1>Halo, {user.name}</h1>
      <h2>Email, {user.email}</h2>
      <button onClick={logout}>Logout</button>
      {/* todoform */}
      {/* todolist -> todoitem */}
    </>
  )
}

export default Home
