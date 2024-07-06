package mainBoards

import (
	"board-buddy/router/middleware"
	"board-buddy/services/boards/handler"
	"board-buddy/services/boards/module"
	lists "board-buddy/services/lists/module"
	users "board-buddy/services/users/module"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Setup(e *echo.Echo, db *gorm.DB) {
	g := e.Group("/boards", middleware.CreateDefaultTokenMiddleWare())

	usersModule := users.NewUsersModule(db)
	listsModule := lists.NewListsModule(db, usersModule)
	boardsModule := boards.NewBoardsModule(db, usersModule, listsModule)

	boardsHandler := handler.NewBoardsHandlerImpl(boardsModule)

	// g.GET("", boardsHandler.LoadAllBoards)
	g.POST("", boardsHandler.CreateBoard)
	g.GET("/:id", boardsHandler.LoadBoard)
	g.DELETE("/:id", boardsHandler.DeleteBoard)
	g.GET("/:id/lists", boardsHandler.LoadAllListsByBoardID)
}
