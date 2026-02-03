package main

import (
	"AuthService/initializer"
	"AuthService/internal/auth"
	"AuthService/internal/todo"
	"AuthService/internal/user"
	"fmt"
	"log"
	"net/http"
)

func main() {
	config := initializer.Load()
	db, err := initializer.NewPostgres(config.DB)
	if err != nil {
		log.Fatal("Failed connect to database:", err)
	}
	auth.InitJWT(config.JWT.Secret)

	// user domain
	userRepo := user.NewRepository(db)
	userService := user.NewService(userRepo)
	userHandler := user.NewHandler(userService)

	// todo domain
	todoRepo := todo.NewRepository(db)
	todoService := todo.NewService(todoRepo)
	todoHandler := todo.NewHandler(todoService)

	// Route
	http.Handle("/register", auth.CORSMiddleware(http.HandlerFunc(userHandler.HandleRegister)))
	http.Handle("/login", auth.CORSMiddleware(http.HandlerFunc(userHandler.HandleLogin)))
	http.Handle("/logout", auth.Protected(userHandler.HandleLogout))
	http.Handle("/protected", auth.Protected(userHandler.HandleProtected))
	http.Handle("/me", auth.Protected(userHandler.HandleGetMe))

	http.Handle("/todos", auth.Protected(todoHandler.TodosHandler))
	http.Handle("/todos/", auth.Protected(todoHandler.TodosByIDHandler))
	
	// Server
	fmt.Println("Server running at port: 8080")
	http.ListenAndServe(":8080", nil)
}