package user

import (
	"database/sql"
	"errors"

	"github.com/lib/pq"
)

type Repository interface {
	Register(name, email, password string) error
	FindByEmail(email string) (*User, error)
	FindByID(userID int) (*User, error)
}

type repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) Repository {
	return &repository{db}
}

func (r *repository) Register(name, email, password string) error {
	_, err := r.db.Exec(
		`INSERT INTO users_tb (name, email, password)
		VALUES ($1, $2, $3)`,
		name,
		email,
		password,
	)
	
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			if pqErr.Code == "23505" {
				return errors.New("Email already exists")
			}
		}

		return err
	}

	return nil
}

func (r *repository) FindByEmail(email string) (*User, error) {
	var user User

	err := r.db.QueryRow(
		`SELECT id, password
		FROM users_tb
		WHERE email = $1`,
		email,
	).Scan(&user.ID, &user.Password)
	if err != nil {
		return nil, err
	}

	user.Email = email
	return &user, nil
}

func (r *repository) FindByID(userID int) (*User, error) {
	var user User

	err := r.db.QueryRow(
		`SELECT name, email
		FROM users_tb
		WHERE id = $1`,
		userID,
	).Scan(&user.Name, &user.Email)
	if err != nil {
		return nil, err
	}

	return &user, nil
}