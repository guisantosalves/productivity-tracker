package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/guisantosalves/productivity-tracker/internal/database"
	"github.com/guisantosalves/productivity-tracker/internal/handler"
	"github.com/guisantosalves/productivity-tracker/internal/repository"
	"github.com/guisantosalves/productivity-tracker/internal/usecase"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func registerTask(router *gin.Engine) {
	taskHandler := handler.NewTaskHandler()
	taskHandler.RegisterRoutes(router)
}

func registerTaskCategory(router *gin.Engine, db *pgxpool.Pool) {
	categoryRepo := repository.NewTaskCategoryRepository(db)
	categoryUsecase := usecase.NewTaskCategoryUsecase(categoryRepo)
	categoryHandler := handler.NewTaskCategoryHandler(categoryUsecase)

	categoryHandler.RegisterRoutes(router)
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using system env vars")
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	pool, err := database.NewPostgresDatabase(ctx)
	if err != nil {
		log.Fatal("Impossible to connect to database")
	}
	defer pool.Close()

	router := gin.Default()

	// rigisters
	registerTask(router)
	registerTaskCategory(router, pool)

	srv := &http.Server{
		Addr:    ":" + os.Getenv("PORT"),
		Handler: router,
	}

	go func() {
		log.Printf("Server running on port: %s", os.Getenv("PORT"))
		err := srv.ListenAndServe()
		if err != nil && err != http.ErrServerClosed {
			log.Fatal(err)
		}
	}()

	<-ctx.Done()
	log.Println("Shutting down...")

	shutdownctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// give 5 second to finish the requests
	if err := srv.Shutdown(shutdownctx); err != nil {
		log.Fatal("server forced to shutdown: ", err)
	}

	log.Println("server exited")
}
