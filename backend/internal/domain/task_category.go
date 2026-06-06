package domain

import (
	"context"
	"errors"
)

type TaskCategory struct {
	ID    string `json:"id"`
	Title string `json:"title"`
}

type TaskCategoryRepository interface {
	CreateTaskCategory(ctx context.Context, taskCT *TaskCategory) error
	List(ctx context.Context) ([]TaskCategory, error)
	Delete(ctx context.Context, id string) error
	FindById(ctx context.Context, id string) (*TaskCategory, error)
}

type TaskCategoryUsecase interface {
	CreateTaskCategory(ctx context.Context, taskCT *TaskCategory) error
	List(ctx context.Context) ([]TaskCategory, error)
	Delete(ctx context.Context, id string) error
	FindById(ctx context.Context, id string) (*TaskCategory, error)
}

var (
	ERR_TASK_CATEGORY_NOT_FOUND = errors.New("taskCategory not found ")
)
