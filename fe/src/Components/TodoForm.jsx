function TodoForm({ task, onTaskChange, error, success, loading, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={task}
          onChange={e => onTaskChange(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
      {error && <small className="text-red-500">{error}</small>}
      {success && <small className="text-green-500">{success}</small>}
    </form>
  )
}

export default TodoForm
