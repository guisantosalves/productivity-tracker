package handler

import (
	"context"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/guisantosalves/productivity-tracker/internal/domain"
)

type TaskCategoryHandler struct {
	usecase domain.TaskCategoryUsecase
}

func NewTaskCategoryHandler(usecase domain.TaskCategoryUsecase) *TaskCategoryHandler {
	return &TaskCategoryHandler{
		usecase: usecase,
	}
}

func (tc *TaskCategoryHandler) CreatingCategory(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	var categoryFromBody struct {
		Title string `json:"title"`
	}

	if err := c.ShouldBindJSON(&categoryFromBody); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := tc.usecase.CreateTaskCategory(ctx, &domain.TaskCategory{
		Title: categoryFromBody.Title,
	}); err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
	}

	c.JSON(201, gin.H{
		"status": "Created",
	})
}

func (tc *TaskCategoryHandler) RegisterRoutes(c *gin.Engine) {
	c.POST("/task-category", tc.CreatingCategory)
}
