package shared

import (
	"encoding/json"
	"log"
	"net/http"
)

type APIMessage struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

func RespondError(w http.ResponseWriter, status int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(APIMessage{
		Status: "Error",
		Message: message,
	})

	log.Println("Error:", message)
}

func RespondSuccess(w http.ResponseWriter, status int, message string, data interface{} ) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(APIMessage{
		Status: "Success",
		Message: message,
		Data: data,
	})

	log.Println("Success:", message)
}