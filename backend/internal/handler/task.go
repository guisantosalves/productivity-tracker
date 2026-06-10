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
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	tasks, err := th.TaskUsecase.ListTask(ctx)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, tasks)
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

func (th *TaskHandler) DeleteTask(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	id := c.Param("id")
	if len(id) == 0 {
		c.JSON(400, gin.H{
			"error": "Invalid param {id}",
		})
		return
	}

	err := th.TaskUsecase.Delete(ctx, id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status": "Deleted",
	})
}

func (th *TaskHandler) FindTaskById(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	id := c.Param("id")
	if len(id) == 0 {
		c.JSON(400, gin.H{
			"error": "Invalid param {id}",
		})
		return
	}

	task, err := th.TaskUsecase.FindTaskById(ctx, id)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, task)
}

func (th *TaskHandler) ListTask(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	tasks, err := th.TaskUsecase.ListTask(ctx)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	// here it has only the task.type.id, it doesnt need to set all the value
	c.JSON(200, tasks)
}

func (th *TaskHandler) UpdateTask(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	id := c.Param("id")

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

	if err := th.TaskUsecase.UpdateTask(
		ctx,
		id,
		taskFromBody.Title,
		taskFromBody.TypeId,
		taskFromBody.DateStart,
		taskFromBody.DateEnd,
		taskFromBody.Descricao,
	); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status": "Updated",
	})
}

func (th *TaskHandler) RegisterRoutes(c *gin.Engine) {
	c.GET("/task", th.listTasks)
	c.POST("/task", th.createTask)
	c.DELETE("/task/:id", th.DeleteTask)
	c.PUT("/task/:id", th.UpdateTask)
	c.GET("/task/:id", th.FindTaskById)
}
