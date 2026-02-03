function TodoItem({ todo, onToggleTodo, onDeleteTodo }) {
    return (
        <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
            <span
                onClick={() => onToggleTodo(todo.id)}
                className={`flex-1 cursor-pointer ${todo.is_completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
            >
                {todo.task}
            </span>
            <button
                onClick={() => onDeleteTodo(todo.id)}
                className="ml-3 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
            >
                Delete
            </button>
        </li>
    )
}

export default TodoItem
