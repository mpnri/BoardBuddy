package mainUsers

import (
	"board-buddy/services/users/handler"
	"board-buddy/services/users/internal/users"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

// route paths:
//
// /users/*
func SetupUsers(e *echo.Echo, db *gorm.DB) {
	//todo: restricted by jwt
	g := e.Group("/users")

	usersModule := users.NewUsersModule(db)

	usersHandler := handler.NewMeetHandlerImpl(usersModule)

	g.GET("", usersHandler.LoadAllUsers)
}
