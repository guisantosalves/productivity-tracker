package domain

import (
	"context"
)

type TaskCategory struct {
	ID    string `json:"id"`
	Title string `json:"title"`
}

type TaskCategoryRepository interface {
	CreateTaskCategory(ctx context.Context, taskCT TaskCategory) error
	List(ctx context.Context) ([]TaskCategory, error)
	Delete(ctx context.Context, id string) (TaskCategory, error)
}

type TaskCategoryUsecase interface {
	CreateTaskCategory(ctx context.Context, taskCT TaskCategory) error
	List(ctx context.Context) ([]TaskCategory, error)
	Delete(ctx context.Context, id string) (TaskCategory, error)
}
