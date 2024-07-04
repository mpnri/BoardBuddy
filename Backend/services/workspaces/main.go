package mainWorkspaces

import (
	"board-buddy/router/middleware"
	users "board-buddy/services/users/module"
	"board-buddy/services/workspaces/handler"
	"board-buddy/services/workspaces/module"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Setup(e *echo.Echo, db *gorm.DB) {
	g := e.Group("/workspaces", middleware.CreateDefaultTokenMiddleWare())

	usersModule := users.NewUsersModule(db)
	workspacesModule := workspaces.NewWorkspacesModule(db, usersModule)

	workspacesHandler := handler.NewWorkspacesHandlerImpl(workspacesModule)

	g.GET("", workspacesHandler.LoadAllWorkspaces)
	g.POST("", workspacesHandler.CreateWorkspace)
	g.GET("/id", workspacesHandler.LoadWorkspace)
	g.DELETE("/id", workspacesHandler.DeleteWorkspace)
}
