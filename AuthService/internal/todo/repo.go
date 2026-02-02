package todo

import (
	"database/sql"
	"errors"
)

type Repository interface {
	PostTodo(userID int, task string) (*Todo, error)
	GetAllTodo(userID int) ([]Todo, error)
	GetTodoByID(todoID, userID int) (*Todo, error)
	PatchTodo(todoID int, userID int, task string, is_completed bool) (*Todo, error)
	DeleteTodo(todoID, userID int) (*Todo, error)
}

type repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) Repository {
	return &repository{db}
}

func (r *repository) PostTodo(userID int, task string) (*Todo, error) {
	var todo Todo

	err := r.db.QueryRow(
		`INSERT INTO todos_tb (user_id, task)
		VALUES ($1, $2)
		RETURNING id, user_id, task, is_completed`,
		userID,
		task,
	).Scan(&todo.ID, &todo.UserID, &todo.Task, &todo.IsCompleted)

	if err != nil {
		return nil, err
	}

	return &todo, nil
}

func (r *repository) GetAllTodo(userID int) ([]Todo, error) {
	var todos []Todo
	var todo Todo

	rows, err := r.db.Query(
		`SELECT id, task, is_completed
		FROM todos_tb
		WHERE user_id = $1
		ORDER BY id ASC`,
		userID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&todo.ID, &todo.Task, &todo.IsCompleted); err != nil {
			return nil, err
		}

		todos = append(todos, todo)
	}

	return todos, nil
}

func (r *repository) GetTodoByID(todoID, userID int) (*Todo, error) {
	var todo Todo

	err := r.db.QueryRow(
		`SELECT task, is_completed
		FROM todos_tb
		WHERE id = $1 AND user_id = $2`,
		todoID,
		userID,
	).Scan(&todo.Task, &todo.IsCompleted)
	if err != nil {
		return nil, errors.New("Todo not found")
	}

	return &todo, nil
}

func (r *repository) PatchTodo(todoID int, userID int, task string, is_completed bool) (*Todo, error) {
	var todo Todo

	err := r.db.QueryRow(
		`UPDATE todos_tb
		SET task=$1, is_completed=$2
		WHERE id=$3 AND user_id=$4
		RETURNING id, user_id, task, is_completed`,
		task,
		is_completed,
		todoID,
		userID,
	).Scan(&todo.ID, &todo.UserID, &todo.Task, &todo.IsCompleted)
	if err != nil {
		return nil, err
	}

	return &todo, nil
}

func (r *repository) DeleteTodo(todoID, userID int) (*Todo, error) {
	var todo Todo
	
	err := r.db.QueryRow(
		`DELETE FROM todos_tb
		WHERE id=$1 AND user_id=$2
		RETURNING id, user_id, task, is_completed`,
		todoID,
		userID,
	).Scan(&todo.ID, &todo.UserID, &todo.Task, &todo.IsCompleted)
	if err != nil {
		return nil, errors.New("Todo not found")
	}

	return &todo, nil
}