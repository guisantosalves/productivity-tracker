package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/guisantosalves/productivity-tracker/internal/domain"
	"github.com/jackc/pgx/v5/pgxpool"
)

type TaskRepository struct {
	taskCategoryRepo domain.TaskCategoryRepository
	db               *pgxpool.Pool
}

// CreateTask implements [domain.TaskRepository].
func (t *TaskRepository) CreateTask(ctx context.Context, task *domain.Task) error {
	query := `
		INSERT INTO Task (title, typeId, dateStart, dateEnd, descricao)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id
	`

	exists, err := t.taskCategoryRepo.TaskCategoryIdExistsById(ctx, task.Type.ID)
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
	query := `
		SELECT id, title, typeId, dateStart, dateEnd, descricao FROM Task WHERE id = $1
	`

	taskResult := &domain.Task{}
	if err := t.db.QueryRow(
		ctx,
		query,
		id).Scan(
		&taskResult.Id,
		&taskResult.Title,
		&taskResult.Type.ID,
		&taskResult.DateStart,
		&taskResult.DateEnd,
		&taskResult.Descricao,
	); err != nil {
		return nil, fmt.Errorf("FindTaskById repo: %w", err)
	}

	// I need to find the taskCategory to make the merge
	Tcategory, err := t.taskCategoryRepo.FindById(ctx, taskResult.Type.ID)
	if err != nil {
		return nil, fmt.Errorf("FindTaskById Invalid task category %s", taskResult.Type.ID)
	}

	// merging
	taskResult.Type = *Tcategory

	return taskResult, nil
}

// ListTask implements [domain.TaskRepository].
func (t *TaskRepository) ListTask(ctx context.Context) ([]domain.Task, error) {
	query := `
		SELECT t.id, t.title, tc.id, tc.title, t.dateStart, t.dateEnd, t.descricao FROM Task t 
		INNER JOIN TaskCategory tc ON t.typeId = tc.id
	`

	rows, err := t.db.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("ListTask repo: %w", err)
	}
	defer rows.Close()

	var results []domain.Task
	for rows.Next() {
		currTask := &domain.Task{}

		err := rows.Scan(
			&currTask.Id,
			&currTask.Title,
			&currTask.Type.ID,
			&currTask.Type.Title,
			&currTask.DateStart,
			&currTask.DateEnd,
			&currTask.Descricao,
		)

		if err != nil {
			return nil, fmt.Errorf("ListTask repo: %w", err)
		}

		results = append(results, *currTask)
	}

	return results, nil
}

// UpdateTask implements [domain.TaskRepository].
func (t *TaskRepository) UpdateTask(
	ctx context.Context,
	id string,
	title string,
	typeid string,
	dateStart time.Time,
	dateEnd time.Time,
	descricao string,
) error {
	query := `
		UPDATE Task SET title = $1, typeId = $2, dateStart = $3, dateEnd = $4, descricao = $5 WHERE id = $6
	`

	exixts, errorVerifyTC := t.taskCategoryRepo.TaskCategoryIdExistsById(ctx, typeid)
	if errorVerifyTC != nil {
		return errorVerifyTC
	}

	if !exixts {
		return fmt.Errorf("updating Task repo: %w", domain.ERR_TASK_CATEGORY_NOT_FOUND)
	}

	tag, err := t.db.Exec(
		ctx,
		query,
		title,
		typeid,
		dateStart,
		dateEnd,
		descricao,
		id,
	)
	if err != nil {
		return fmt.Errorf("updating Task repo: %w", err)
	}

	if tag.RowsAffected() == 0 {
		return fmt.Errorf("updating Task repo: %w", domain.ERR_TASK_NOT_FOUND)
	}

	return nil
}

func NewTaskRepository(db *pgxpool.Pool, taskCategoryRepo domain.TaskCategoryRepository) domain.TaskRepository {
	return &TaskRepository{
		db:               db,
		taskCategoryRepo: taskCategoryRepo,
	}
}
