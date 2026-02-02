package user

import (
	"AuthService/internal/auth"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type Service interface {
	Register(req ReqUserRegister) error
	Login(req ReqUserLogin) (string, error)
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service{repo}
}

func (s *service) Register(req ReqUserRegister) error {
	if req.Name == "" {
		return errors.New("Name is required")
	}
	if req.Email == "" {
		return errors.New("Email is required")
	}
	if req.Password == "" {
		return errors.New("Password is required")
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), 10)
	if err != nil {
		return err
	}

	return s.repo.Register(req.Name, req.Email, string(hash))
}

func (s *service) Login(req ReqUserLogin) (string, error) {
	if req.Email == "" {
		return "", errors.New("Email is required")
	}
	if req.Password == "" {
		return "", errors.New("Password is required")
	}

	user, err := s.repo.FindByEmail(req.Email)
	if err != nil {
		return "", errors.New("Email or password is wrong")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return "", errors.New("Email or password is wrong")
	}

	token, err := auth.GenerateToken(user.ID)
	if err != nil {
		return "", err
	}

	return token, nil
}