import React from 'react'

function TodoItem({ todo, onToggleTodo, onDeleteTodo }) {
    return (
        <div>
            <span
                onClick={() => onToggleTodo(todo.id)}
                style={{ cursor: "pointer", textDecoration: todo.is_completed ? "line-through" : "none" }}
            >
                {todo.task}
            </span>
            <button onClick={() => onDeleteTodo(todo.id)}>X</button>
        </div>
    )
}

export default TodoItem
