package todo

import "errors"

type Service interface {
	PostTodo(userID int, req ReqTodoPost) (*Todo, error)
	GetAllTodo(userID int) ([]Todo, error)
	PatchTodo(todoID int, userID int, req ReqTodoPatch) (*Todo, error)
	DeleteTodo(todoID, userID int) (*Todo, error)
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service{repo}
}

func (s *service) PostTodo(userID int, req ReqTodoPost) (*Todo, error) {
	if req.Task == "" {
		return nil, errors.New("Task is required")
	}

	return s.repo.PostTodo(userID, req.Task)
}

func (s *service) GetAllTodo(userID int) ([]Todo, error) {
	return s.repo.GetAllTodo(userID)
}

func (s *service) PatchTodo(todoID int, userID int, req ReqTodoPatch) (*Todo, error) {
	currentTodo, err := s.repo.GetTodoByID(todoID, userID)
	if err != nil {
		return nil, err
	}

	if req.Task != nil {
		if *req.Task == "" {
			return nil, errors.New("Task cannot empty")
		}

		currentTodo.Task = *req.Task
	}
	if req.IsCompleted != nil {
		currentTodo.IsCompleted = *req.IsCompleted
	}

	return s.repo.PatchTodo(todoID, userID, currentTodo.Task, currentTodo.IsCompleted)
}

func (s *service) DeleteTodo(todoID, userID int) (*Todo, error) {
	return s.repo.DeleteTodo(todoID, userID)
}