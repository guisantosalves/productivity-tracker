package usecase

import (
	"context"

	"github.com/guisantosalves/productivity-tracker/internal/domain"
)

type TaskCategoryUsecase struct {
	repo domain.TaskCategoryRepository
}

func NewTaskCategoryUsecase(repo domain.TaskCategoryRepository) domain.TaskCategoryUsecase {
	return &TaskCategoryUsecase{
		repo: repo,
	}
}

// CreateTaskCategory implements [domain.TaskCategoryUsecase].
func (t *TaskCategoryUsecase) CreateTaskCategory(ctx context.Context, taskCT *domain.TaskCategory) error {
	return t.repo.CreateTaskCategory(ctx, taskCT)
}

// Delete implements [domain.TaskCategoryUsecase].
func (t *TaskCategoryUsecase) Delete(ctx context.Context, id string) error {
	panic("unimplemented")
}

// FindById implements [domain.TaskCategoryUsecase].
func (t *TaskCategoryUsecase) FindById(ctx context.Context, id string) (*domain.TaskCategory, error) {
	panic("unimplemented")
}

// List implements [domain.TaskCategoryUsecase].
func (t *TaskCategoryUsecase) List(ctx context.Context) ([]domain.TaskCategory, error) {
	panic("unimplemented")
}
