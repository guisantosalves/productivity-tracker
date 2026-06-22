package repository

import (
	"context"

	"github.com/guisantosalves/productivity-tracker/internal/domain"
	"github.com/jackc/pgx/v5/pgxpool"
)

type UserRepository struct {
	db *pgxpool.Pool
}

// CreateUser implements [domain.UserRepository].
func (u *UserRepository) CreateUser(ctx context.Context, user *domain.User) error {
	panic("unimplemented")
}

// Delete implements [domain.UserRepository].
func (u *UserRepository) Delete(ctx context.Context, id string) error {
	panic("unimplemented")
}

// FindUserById implements [domain.UserRepository].
func (u *UserRepository) FindUserById(ctx context.Context, id string) (*domain.User, error) {
	panic("unimplemented")
}

// ListUser implements [domain.UserRepository].
func (u *UserRepository) ListUser(ctx context.Context) ([]domain.User, error) {
	panic("unimplemented")
}

// Login implements [domain.UserRepository].
func (u *UserRepository) Login(ctx context.Context) (domain.TokenRes, error) {
	panic("unimplemented")
}

// Logout implements [domain.UserRepository].
func (u *UserRepository) Logout(ctx context.Context) {
	panic("unimplemented")
}

// UpdateUser implements [domain.UserRepository].
func (u *UserRepository) UpdateUser(ctx context.Context, id string, email string, senha string) error {
	panic("unimplemented")
}

func NewUserRepository(db *pgxpool.Pool) domain.UserRepository {
	return &UserRepository{
		db: db,
	}
}
