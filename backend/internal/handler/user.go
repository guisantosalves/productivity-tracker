package handler

import (
	"context"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/guisantosalves/productivity-tracker/internal/domain"
)

type UserHandler struct {
	userUsecase domain.UserUsecase
}

func NewUserHandler(userUsecase domain.UserUsecase) *UserHandler {
	return &UserHandler{
		userUsecase: userUsecase,
	}
}

// TODO -> implementar os métodos restantes e middleware, após isso inserir a coluna user_id nas outras tables
func (uh *UserHandler) login(c *gin.Context) {
	_, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	// token, err := uh.userUsecase.Login(ctx)
	// if err != nil {
	// 	c.JSON(400, gin.H{
	// 		"error": err.Error(),
	// 	})
	// 	return
	// }

	c.JSON(200, gin.H{
		"status": "Logged in",
	})
}

func (uh *UserHandler) RegisterRoutes(c *gin.Engine) {
	c.POST("/login", uh.login)
}
