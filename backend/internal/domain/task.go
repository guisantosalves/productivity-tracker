package domain

import (
	"context"
	"errors"
	"time"
)

type Task struct {
	Id        string       `json:"id"`
	Title     string       `json:"title"`
	Type      TaskCategory `json:"type"`
	DateStart time.Time    `json:"dateStart"`
	DateEnd   time.Time    `json:"dateEnd"`
	Descricao string       `json:"descricao"`
}

type TaskRepository interface {
	CreateTask(ctx context.Context, task *Task) error
	UpdateTask(ctx context.Context, id string, title string, typeid string, dateStart time.Time, dateEnd time.Time, descricao string) error
	Delete(ctx context.Context, id string) error
	ListTask(ctx context.Context) ([]Task, error)
	FindTaskById(ctx context.Context, id string) (*Task, error)
}

type TaskUsecase interface {
	CreateTask(ctx context.Context, task *Task) error
	UpdateTask(ctx context.Context, id string, title string, typeid string, dateStart time.Time, dateEnd time.Time, descricao string) error
	Delete(ctx context.Context, id string) error
	ListTask(ctx context.Context) ([]Task, error)
	FindTaskById(ctx context.Context, id string) (*Task, error)
}

var (
	ERR_TASK_NOT_FOUND = errors.New("task not found ")
)
