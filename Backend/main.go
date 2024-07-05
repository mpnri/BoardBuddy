package main

import (
	"board-buddy/models"
	"board-buddy/router"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func InitDB() *gorm.DB {
	//todo: use viper or a better solution
	var dsn = "host=" + os.Getenv("DB_HOST") +
		" user=" + os.Getenv("POSTGRES_USER") +
		" password=" + os.Getenv("POSTGRES_PASSWORD") +
		" dbname=" + os.Getenv("POSTGRES_DB") +
		" port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&models.User{}, &models.Workspace{}, &models.Board{}, &models.Card{})

	return db
}

func main() {
	if godotenv.Load() != nil {
		fmt.Println("load env file error")
		return
	}

	fmt.Println("Hello Board Buddy")
	db := InitDB()
	e := echo.New()
	router.SetupRoutes(e, db)
}
