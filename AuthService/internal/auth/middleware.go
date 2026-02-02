package auth

import (
	"AuthService/internal/shared"
	"context"
	"net/http"
	"strings"
)

type contextKey string

const UserIDKey contextKey = "user_id"

func JWTMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			shared.RespondError(w, http.StatusUnauthorized, "Unauthorized")
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			shared.RespondError(w, http.StatusUnauthorized, "Invalid authorization header")
			return
		}

		tokenString := strings.TrimSpace(
			strings.TrimPrefix(authHeader, "Bearer "),
		)

		claims, err := VerifyToken(tokenString)
		if err != nil {
			shared.RespondError(w, http.StatusUnauthorized, "Unauthorized")
			return
		}

		userID, ok := claims["user_id"].(float64) // JWT numeric → float64
		if !ok {
			shared.RespondError(w, http.StatusUnauthorized, "Invalid token claims")
			return
		}

		ctx := context.WithValue(r.Context(), UserIDKey, int(userID))
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func Protected(h http.HandlerFunc) http.Handler {
	return CORSMiddleware(
		JWTMiddleware(
			http.HandlerFunc(h),
		),
	)
}
