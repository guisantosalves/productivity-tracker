package repository

import (
	"context"
	"fmt"

	"github.com/guisantosalves/productivity-tracker/internal/domain"
	"github.com/jackc/pgx/v5/pgxpool"
)

type TaskCategoryRepository struct {
	db *pgxpool.Pool
}

// CreateTaskCategory implements [domain.TaskCategoryRepository].
func (t *TaskCategoryRepository) CreateTaskCategory(ctx context.Context, taskCT *domain.TaskCategory) error {
	query := `
		INSERT INTO TaskCategory (title) VALUES ($1)
		RETURNING id, title
	`

	if err := t.db.QueryRow(
		ctx,
		query,
		taskCT.Title,
	).Scan(&taskCT.ID, &taskCT.Title); err != nil {
		return fmt.Errorf("create taskCategory repo: %w", err)
	}

	return nil
}

// Delete implements [domain.TaskCategoryRepository].
func (t *TaskCategoryRepository) Delete(ctx context.Context, id string) error {
	panic("unimplemented")
}

// List implements [domain.TaskCategoryRepository].
func (t *TaskCategoryRepository) List(ctx context.Context) ([]domain.TaskCategory, error) {
	panic("unimplemented")
}

// FindById implements [domain.TaskCategoryRepository].
func (t *TaskCategoryRepository) FindById(ctx context.Context, id string) (*domain.TaskCategory, error) {
	panic("unimplemented")
}

func NewTaskCategoryRepository(db *pgxpool.Pool) domain.TaskCategoryRepository {
	return &TaskCategoryRepository{
		db: db,
	}
}
