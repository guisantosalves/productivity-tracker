package handler

import (
	"context"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/guisantosalves/productivity-tracker/internal/domain"
)

type TaskHandler struct {
	TaskUsecase domain.TaskUsecase
}

func NewTaskHandler(taskUsecase domain.TaskUsecase) *TaskHandler {
	return &TaskHandler{
		TaskUsecase: taskUsecase,
	}
}

func (th *TaskHandler) listTasks(c *gin.Context) {
	_, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	c.JSON(200, gin.H{
		"data": "exemple",
	})
}

func (th *TaskHandler) createTask(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	var taskFromBody struct {
		Title     string    `json:"title"`
		TypeId    string    `json:"type"`
		DateStart time.Time `json:"dateStart"`
		DateEnd   time.Time `json:"dateEnd"`
		Descricao string    `json:"descricao"`
	}

	if err := c.ShouldBindJSON(&taskFromBody); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	// mapping
	TaskCategoryData := &domain.TaskCategory{
		ID: taskFromBody.TypeId,
	}

	TaskData := &domain.Task{
		Title:     taskFromBody.Title,
		Type:      *TaskCategoryData,
		DateStart: taskFromBody.DateStart,
		DateEnd:   taskFromBody.DateEnd,
		Descricao: taskFromBody.Descricao,
	}

	err := th.TaskUsecase.CreateTask(ctx, TaskData)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(201, gin.H{
		"status": "Created",
	})

}

func (th *TaskHandler) DeleteTask(c *gin.Engine) {
}

func (th *TaskHandler) FindTaskById(c *gin.Engine) {
}

func (th *TaskHandler) ListTask(c *gin.Engine) {
}

func (th *TaskHandler) UpdateTask(c *gin.Engine) {
}

func (th *TaskHandler) RegisterRoutes(c *gin.Engine) {
	c.GET("/task", th.listTasks)
	c.POST("/task", th.createTask)
}
