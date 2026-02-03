import React, { useEffect, useState } from 'react'
import TodoForm from '../Components/TodoForm';
import TodoList from '../Components/TodoList';
import { getMe } from '../Services/AuthService';
import { getTodoAPI, postTodoAPI, patchTodoAPI, deleteTodoAPI } from '../Services/TodoService';

function Home() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

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
        setUserLoading(false)
      }
    }

    fetchMe()
    fetchTodo()
  }, []);

  const fetchTodo = async () => {
    try {
      const data = await getTodoAPI()
      setTodos(Array.isArray(data.data) ? data.data : [])
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const data = await postTodoAPI(task)
      setSuccess(data.message)
      setTask('')
      fetchTodo()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateTodo = async (id) => {
    const current = todos.find((t) => t.id === id)
    if (!current) return

    const newStatus = !current.is_completed

    try {
      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? { ...todo, is_completed: newStatus }
            : todo
        )
      )

      await patchTodoAPI(id, { is_completed: newStatus })
      fetchTodo()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await deleteTodoAPI(id)
      fetchTodo()
    } catch (err) {
      console.error(err)
    }
  }


  if (userLoading) return <p>Loading...</p>

  return (
    <>
      <h1>Halo, {user.name}</h1>
      <h2>Email, {user.email}</h2>
      <button onClick={logout}>Logout</button>
      <TodoForm
        task={task}
        onTaskChange={setTask}
        error={error}
        success={success}
        loading={loading}
        onSubmit={handleSubmit}
      />
      <TodoList
        todos={todos}
        onToggleTodo={updateTodo}
        onDeleteTodo={deleteTodo}
      />
    </>
  )
}

export default Home
