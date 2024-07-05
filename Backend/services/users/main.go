package mainUsers

import (
	"board-buddy/router/middleware"
	"board-buddy/services/users/handler"
	"board-buddy/services/users/module"	

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Setup(e *echo.Echo, db *gorm.DB) {
	g := e.Group("/users", middleware.CreateDefaultTokenMiddleWare())

	usersModule := users.NewUsersModule(db)

	usersHandler := handler.NewUsersHandlerImpl(usersModule)

	g.GET("", usersHandler.LoadAllUsers)
	g.GET("/:id", usersHandler.LoadUser)
}
