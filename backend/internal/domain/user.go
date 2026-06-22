package domain

import (
	"context"
	"errors"
)

// state -> 0 ativo | 1 inativo
type User struct {
	Id       string `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	State    byte   `json:"state"`
}

type TokenRes struct {
	Token string `json:"token"`
}

type UserRepository interface {
	CreateUser(ctx context.Context, user *User) error
	UpdateUser(ctx context.Context, id, email, senha string) error
	Delete(ctx context.Context, id string) error
	ListUser(ctx context.Context) ([]User, error)
	FindUserById(ctx context.Context, id string) (*User, error)
	Login(ctx context.Context) (TokenRes, error)
	Logout(ctx context.Context)
}

type UserUsecase interface {
	CreateUser(ctx context.Context, user *User) error
	UpdateUser(ctx context.Context, id, email, senha string) error
	Delete(ctx context.Context, id string) error
	ListUser(ctx context.Context) ([]User, error)
	FindUserById(ctx context.Context, id string) (*User, error)
	Login(ctx context.Context) (TokenRes, error)
	Logout(ctx context.Context)
}

var (
	ERR_USER_NOT_FOUND = errors.New("user not found ")
)
