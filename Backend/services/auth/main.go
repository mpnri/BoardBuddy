package mainAuth

import (
	"board-buddy/services/auth/handler"
	"board-buddy/services/auth/module"
	users "board-buddy/services/users/module"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Setup(e *echo.Echo, db *gorm.DB) {
	g := e.Group("/auth")

	authModule := auth.NewAuthModule(db, users.NewUsersModule(db))

	authHandler := handler.NewAuthHandlerImpl(authModule)

	g.POST("/register", authHandler.RegisterUser)
	g.POST("/login", authHandler.LoginUser)
}
