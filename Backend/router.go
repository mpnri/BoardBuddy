package main

import (
	users "board-buddy/services/users"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func SetupRoutes(e *echo.Echo, db *gorm.DB) {
	users.SetupUsers(e, db)

	e.Logger.Fatal(e.Start(":3005"))
}
