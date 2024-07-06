package mainLists

import (
	"board-buddy/router/middleware"
	users "board-buddy/services/users/module"
	"board-buddy/services/lists/handler"
	"board-buddy/services/lists/module"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Setup(e *echo.Echo, db *gorm.DB) {
	g := e.Group("/lists", middleware.CreateDefaultTokenMiddleWare())

	usersModule := users.NewUsersModule(db)
	listsModule := lists.NewListsModule(db, usersModule)

	listsHandler := handler.NewListsHandlerImpl(listsModule)

	// g.GET("", listsHandler.LoadAllLists)
	g.POST("", listsHandler.CreateList)
	// g.GET("/:id", listsHandler.LoadList)
	g.DELETE("/:id", listsHandler.DeleteList)
}
