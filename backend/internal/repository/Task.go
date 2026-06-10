package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/guisantosalves/productivity-tracker/internal/domain"
	"github.com/jackc/pgx/v5/pgxpool"
)

type TaskRepository struct {
	db *pgxpool.Pool
}

// helper
func (t *TaskRepository) taskCategoryIdExistsById(ctx context.Context, id string) (bool, error) {
	var exists bool
	queryVerifyTaskCategory := `
		SELECT EXISTS(SELECT 1 FROM TaskCategory WHERE id = $1) 
	`

	if err := t.db.QueryRow(
		ctx,
		queryVerifyTaskCategory,
		id,
	).Scan(&exists); err != nil {
		return false, fmt.Errorf("Create task repo: %w", domain.ERR_TASK_CATEGORY_NOT_FOUND)
	}

	return exists, nil
}

// CreateTask implements [domain.TaskRepository].
func (t *TaskRepository) CreateTask(ctx context.Context, task *domain.Task) error {
	query := `
		INSERT INTO Task (title, typeId, dateStart, dateEnd, descricao)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id
	`

	exists, err := t.taskCategoryIdExistsById(ctx, task.Type.ID)
	if err != nil {
		return err
	}

	if !exists {
		return fmt.Errorf("Create task repo, taskCategoryId %s not found", task.Type.ID)
	}

	if err := t.db.QueryRow(
		ctx,
		query,
		task.Title,
		task.Type.ID,
		task.DateStart,
		task.DateEnd,
		task.Descricao,
	).Scan(&task.Id); err != nil {
		return fmt.Errorf("Create task repo: %w", err)
	}

	return nil
}

// Delete implements [domain.TaskRepository].
func (t *TaskRepository) Delete(ctx context.Context, id string) error {
	query := `
		DELETE FROM Task WHERE id = $1
	`

	tag, err := t.db.Exec(ctx, query, id)
	if err != nil {
		return fmt.Errorf("Delete Task repo: %w", err)
	}

	if tag.RowsAffected() == 0 {
		return fmt.Errorf("Delete Task repo: %w", domain.ERR_TASK_NOT_FOUND)
	}

	return nil
}

// FindTaskById implements [domain.TaskRepository].
func (t *TaskRepository) FindTaskById(ctx context.Context, id string) (*domain.Task, error) {
	panic("unimplemented")
}

// ListTask implements [domain.TaskRepository].
func (t *TaskRepository) ListTask(ctx context.Context) ([]domain.Task, error) {
	panic("unimplemented")
}

// UpdateTask implements [domain.TaskRepository].
func (t *TaskRepository) UpdateTask(ctx context.Context, id string, title string, dateStart time.Time, dateEnd time.Time, time string) error {
	panic("unimplemented")
}

func NewTaskRepository(db *pgxpool.Pool) domain.TaskRepository {
	return &TaskRepository{
		db: db,
	}
}
