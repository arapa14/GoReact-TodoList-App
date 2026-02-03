package user

import (
	"AuthService/internal/auth"
	"AuthService/internal/shared"
	"context"
	"encoding/json"
	"net/http"
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

func (h *Handler) HandleRegister(w http.ResponseWriter, r *http.Request) {
	var req ReqUserRegister

	if r.Method != http.MethodPost {
		shared.RespondError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		shared.RespondError(w, http.StatusBadRequest, "JSON isn't valid")
		return
	}

	err = h.service.Register(req)
	if err != nil {
		shared.RespondError(w, http.StatusBadRequest, err.Error())
		return
	}

	shared.RespondSuccess(w, http.StatusCreated, "Success Register", nil)
	return
}

func (h *Handler) HandleLogin(w http.ResponseWriter, r *http.Request) {
	var req ReqUserLogin

	if r.Method != http.MethodPost {
		shared.RespondError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		shared.RespondError(w, http.StatusBadRequest, "JSON isn't valid")
		return
	}

	token, err := h.service.Login(req)
	if err != nil {
		shared.RespondError(w, http.StatusBadRequest, err.Error())
		return
	}

	shared.RespondSuccess(w, http.StatusOK, "Success Login", token)
	return
}

func (h *Handler) HandleLogout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		shared.RespondError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	// JWT stateless → tidak ada yang dihapus di server
	shared.RespondSuccess(w, http.StatusOK, "Success logout", nil)
}

func (h *Handler) HandleProtected(w http.ResponseWriter, r *http.Request) {
	shared.RespondSuccess(w, http.StatusOK, "This is restricted area", nil)
}

func (h *Handler) HandleGetMe(w http.ResponseWriter, r *http.Request) {
	userID, ok := GetUserIDFromContext(r.Context())
	if !ok {
		shared.RespondError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	user, err := h.service.GetMe(userID)
	if err != nil {
		shared.RespondError(w, http.StatusBadRequest, err.Error())
		return
	}

	shared.RespondSuccess(w, http.StatusOK, "Success get me", user)
}