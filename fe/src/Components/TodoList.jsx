import React from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
    return (
        <>
            {todos.map((todo, index) => (
                <TodoItem key={index} todo={todo} onToggleTodo={onToggleTodo} onDeleteTodo={onDeleteTodo}/>
            ))}
        </>
    )
}

export default TodoList
