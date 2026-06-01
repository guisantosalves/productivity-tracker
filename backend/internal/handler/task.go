package handler

import (
	"context"
	"time"

	"github.com/gin-gonic/gin"
)

type TaskHandler struct{}

func NewTaskHandler() *TaskHandler {
	return &TaskHandler{}
}

func (th *TaskHandler) listTasks(c *gin.Context) {
	_, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	c.JSON(200, gin.H{
		"data": "exemple",
	})
}

func (th *TaskHandler) RegisterRoutes(c *gin.Engine) {
	c.GET("/task", th.listTasks)
}
