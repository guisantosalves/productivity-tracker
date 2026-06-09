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
	query := `
		DELETE FROM TaskCategory WHERE id = $1
	`

	tag, err := t.db.Exec(ctx, query, id)
	if err != nil {
		return fmt.Errorf("delete taskCategory repo: %w", err)
	}

	if tag.RowsAffected() == 0 {
		return fmt.Errorf("delete taskCategory repo: %w", domain.ERR_TASK_CATEGORY_NOT_FOUND)
	}

	return nil
}

// List implements [domain.TaskCategoryRepository].
func (t *TaskCategoryRepository) List(ctx context.Context) ([]domain.TaskCategory, error) {
	query := `
		SELECT id, title FROM TaskCategory
	`

	rows, err := t.db.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("List taskCategory repo: %w", err)
	}
	defer rows.Close()

	var resultList []domain.TaskCategory
	for rows.Next() {
		var currTaskCategory domain.TaskCategory
		err := rows.Scan(
			&currTaskCategory.ID,
			&currTaskCategory.Title,
		)
		if err != nil {
			return nil, fmt.Errorf("List taskCategory repo: %w", err)
		}
		resultList = append(resultList, currTaskCategory)
	}

	return resultList, nil
}

// FindById implements [domain.TaskCategoryRepository].
func (t *TaskCategoryRepository) FindById(ctx context.Context, id string) (*domain.TaskCategory, error) {
	query := `
		SELECT id, title FROM TaskCategory WHERE id = $1
	`

	currTaskCategory := &domain.TaskCategory{}
	err := t.db.QueryRow(ctx, query, id).Scan(
		&currTaskCategory.ID,
		&currTaskCategory.Title,
	)

	if err != nil {
		return nil, fmt.Errorf("findbyid taskCategory repo: %w", err)
	}

	return currTaskCategory, nil
}

func NewTaskCategoryRepository(db *pgxpool.Pool) domain.TaskCategoryRepository {
	return &TaskCategoryRepository{
		db: db,
	}
}
