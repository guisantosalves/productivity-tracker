## Rodando as migrations
psql "postgres://postgres:password@localhost:5432/productivitytracker?sslmode=disable" -f ./migration/001_start_migraation.sql