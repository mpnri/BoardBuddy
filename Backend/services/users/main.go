package mainUsers

import (
	"board-buddy/router/middleware"
	"board-buddy/services/users/handler"
	"board-buddy/services/users/module"
	"board-buddy/services/utils"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

// route paths:
//
// /users/*
func Setup(e *echo.Echo, db *gorm.DB) {
	//todo: restricted by jwt
	g := e.Group("/users", middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: []byte(utils.GetJWTSecret()),
	}))

	usersModule := users.NewUsersModule(db)

	usersHandler := handler.NewUsersHandlerImpl(usersModule)

	g.GET("", usersHandler.LoadAllUsers)
	g.GET("/id", usersHandler.LoadUser)
	g.GET("/me", usersHandler.GetMe)
}
