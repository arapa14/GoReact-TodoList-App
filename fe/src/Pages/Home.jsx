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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-purple-700">Halo, {user.name}</h1>
            <h2 className="text-gray-600">{user.email}</h2>
          </div>
          <button
            onClick={logout}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Logout
          </button>
        </div>

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
      </div>
    </div>
  )
}

export default Home
