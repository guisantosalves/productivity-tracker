package database

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func NewPostgresDatabase(ctx context.Context) (*pgxpool.Pool, error) {
	connectionStr := os.Getenv("DATABASE_URL")
	pool, err := pgxpool.New(ctx, connectionStr)
	if err != nil {
		return nil, err
	}
	log.Printf("Successfuly Connected to database")
	return pool, nil
}
