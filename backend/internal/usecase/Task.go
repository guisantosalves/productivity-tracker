package usecase

import (
	"context"
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
	panic("unimplemented")
}

// FindTaskById implements [domain.TaskUsecase].
func (t *TaskUsecase) FindTaskById(ctx context.Context, id string) (*domain.Task, error) {
	panic("unimplemented")
}

// ListTask implements [domain.TaskUsecase].
func (t *TaskUsecase) ListTask(ctx context.Context) ([]domain.Task, error) {
	panic("unimplemented")
}

// UpdateTask implements [domain.TaskUsecase].
func (t *TaskUsecase) UpdateTask(ctx context.Context, id string, title string, dateStart time.Time, dateEnd time.Time, time string) error {
	panic("unimplemented")
}

func NewTaskUsecase(taskRepo domain.TaskRepository) domain.TaskUsecase {
	return &TaskUsecase{
		TaskRepo: taskRepo,
	}
}
