import React from 'react'

function TodoForm({task, onTaskChange, error, success, loading, onSubmit}) {
  return (
    <>
      <h1>Add Todo</h1>
      <form onSubmit={onSubmit} style={{display:"flex", flexDirection:"column", maxWidth:"300px", gap:"10px"}}>
        <label>Task</label>
        <input type="text" placeholder='What i want todo?' value={task} onChange={e => onTaskChange(e.target.value)}/>
        {error && <small style={{ color: 'red' }}>{error}</small>}
        {success && <small style={{ color: 'green' }}>{success}</small>}
        <button type='submit' disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
      </form>
    </>
  )
}

export default TodoForm
