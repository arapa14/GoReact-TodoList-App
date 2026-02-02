package todo

import (
	"AuthService/internal/auth"
	"AuthService/internal/shared"
	"context"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
)

type Handler struct {
	service Service
}

func NewHandler(service Service) *Handler {
	return &Handler{service}
}

func GetUserIDFromContext(ctx context.Context) (int, bool) {
	userID, ok := ctx.Value(auth.UserIDKey).(int)
	return userID, ok
}

func (h *Handler) TodosHandler(w http.ResponseWriter, r *http.Request) {
	userID, ok := GetUserIDFromContext(r.Context())
	if !ok {
		shared.RespondError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	switch r.Method {
	case http.MethodGet:
		h.HandleGetAllTodo(w, userID)
		return
	case http.MethodPost:
		h.HandlePostTodo(w, r, userID)
		return
	default:
		shared.RespondError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}
}

func (h *Handler) TodosByIDHandler(w http.ResponseWriter, r *http.Request) {
	todoIDString := strings.TrimPrefix(r.URL.Path, "/todos/")
	todoID, err := strconv.Atoi(todoIDString)
	if err != nil {
		shared.RespondError(w, http.StatusBadRequest, "ID isn't valid")
		return
	}

	userID, ok := GetUserIDFromContext(r.Context())
	if !ok {
		shared.RespondError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	switch r.Method {
	case http.MethodPatch:
		h.HandlePatchTodo(w, r, todoID, userID)
		return
	case http.MethodDelete:
		h.HandleDeleteTodo(w, todoID, userID)
	default:
		shared.RespondError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}
}

func (h *Handler) HandlePostTodo(w http.ResponseWriter, r *http.Request, userID int) {
	var req ReqTodoPost

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		shared.RespondError(w, http.StatusBadRequest, "JSON isn't valid")
		return
	}

	todo, err := h.service.PostTodo(userID, req)
	if err != nil {
		shared.RespondError(w, http.StatusBadRequest, err.Error())
		return
	}

	shared.RespondSuccess(w, http.StatusCreated, "Success create todo", todo)
	return
}

func (h *Handler) HandleGetAllTodo(w http.ResponseWriter, userID int) {
	todos, err := h.service.GetAllTodo(userID)
	if err != nil {
		shared.RespondError(w, http.StatusBadRequest, err.Error())
		return
	}

	shared.RespondSuccess(w, http.StatusOK, "Success get todo", todos)
	return
}

func (h *Handler) HandlePatchTodo(w http.ResponseWriter, r *http.Request, todoID int, userID int) {
	var req ReqTodoPatch

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		shared.RespondError(w, http.StatusBadRequest, "JSON isn't valid")
		return
	}

	todo, err := h.service.PatchTodo(todoID, userID, req)
	if err != nil {
		shared.RespondError(w, http.StatusBadRequest, err.Error())
		return
	}

	shared.RespondSuccess(w, http.StatusOK, "Success update todo", todo)
}

func (h *Handler) HandleDeleteTodo(w http.ResponseWriter, todoID int, userID int) {
	todo, err := h.service.DeleteTodo(todoID, userID)
	if err != nil {
		shared.RespondError(w, http.StatusBadRequest, err.Error())
		return
	}

	shared.RespondSuccess(w, http.StatusOK, "Success delete todo", todo)
}