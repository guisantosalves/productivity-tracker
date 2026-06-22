package usecase

import (
	"context"

	"github.com/guisantosalves/productivity-tracker/internal/domain"
)

type UserUsecase struct {
	repository domain.UserRepository
}

// CreateUser implements [domain.UserUsecase].
func (u *UserUsecase) CreateUser(ctx context.Context, user *domain.User) error {
	panic("unimplemented")
}

// Delete implements [domain.UserUsecase].
func (u *UserUsecase) Delete(ctx context.Context, id string) error {
	panic("unimplemented")
}

// FindUserById implements [domain.UserUsecase].
func (u *UserUsecase) FindUserById(ctx context.Context, id string) (*domain.User, error) {
	panic("unimplemented")
}

// ListUser implements [domain.UserUsecase].
func (u *UserUsecase) ListUser(ctx context.Context) ([]domain.User, error) {
	panic("unimplemented")
}

// Login implements [domain.UserUsecase].
func (u *UserUsecase) Login(ctx context.Context) (domain.TokenRes, error) {
	panic("unimplemented")
}

// Logout implements [domain.UserUsecase].
func (u *UserUsecase) Logout(ctx context.Context) {
	panic("unimplemented")
}

// UpdateUser implements [domain.UserUsecase].
func (u *UserUsecase) UpdateUser(ctx context.Context, id string, email string, senha string) error {
	panic("unimplemented")
}

func NewUserUsecase(repo domain.UserRepository) domain.UserUsecase {
	return &UserUsecase{
		repository: repo,
	}
}
