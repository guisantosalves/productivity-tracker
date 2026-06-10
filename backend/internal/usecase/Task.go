package usecase

import (
	"context"
	"fmt"
	"time"

	"github.com/guisantosalves/productivity-tracker/internal/domain"
)

type TaskUsecase struct {
	TaskRepo domain.TaskRepository
}

// CreateTask implements [domain.TaskUsecase].
func (t *TaskUsecase) CreateTask(ctx context.Context, task *domain.Task) error {
	return t.TaskRepo.CreateTask(ctx, task)
}

// Delete implements [domain.TaskUsecase].
func (t *TaskUsecase) Delete(ctx context.Context, id string) error {
	if len(id) == 0 {
		return fmt.Errorf("task usecase: Invalid Id")
	}

	return t.TaskRepo.Delete(ctx, id)
}

// FindTaskById implements [domain.TaskUsecase].
func (t *TaskUsecase) FindTaskById(ctx context.Context, id string) (*domain.Task, error) {
	if len(id) == 0 {
		return nil, fmt.Errorf("task usecase: Invalid Id")
	}

	return t.TaskRepo.FindTaskById(ctx, id)
}

// ListTask implements [domain.TaskUsecase].
func (t *TaskUsecase) ListTask(ctx context.Context) ([]domain.Task, error) {
	return t.TaskRepo.ListTask(ctx)
}

// UpdateTask implements [domain.TaskUsecase].
func (t *TaskUsecase) UpdateTask(
	ctx context.Context,
	id string,
	title string,
	typeid string,
	dateStart time.Time,
	dateEnd time.Time,
	descricao string,
) error {
	return t.TaskRepo.UpdateTask(
		ctx, id, title, typeid, dateStart, dateEnd, descricao,
	)
}

func NewTaskUsecase(taskRepo domain.TaskRepository) domain.TaskUsecase {
	return &TaskUsecase{
		TaskRepo: taskRepo,
	}
}
