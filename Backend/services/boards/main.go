package mainBoards

import (
	"board-buddy/router/middleware"
	users "board-buddy/services/users/module"
	"board-buddy/services/boards/handler"
	"board-buddy/services/boards/module"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Setup(e *echo.Echo, db *gorm.DB) {
	g := e.Group("/boards", middleware.CreateDefaultTokenMiddleWare())

	usersModule := users.NewUsersModule(db)
	boardsModule := boards.NewBoardsModule(db, usersModule)

	boardsHandler := handler.NewBoardsHandlerImpl(boardsModule)

	// g.GET("", boardsHandler.LoadAllBoards)
	g.POST("", boardsHandler.CreateBoard)
	g.GET("/:id", boardsHandler.LoadBoard)
	g.DELETE("/:id", boardsHandler.DeleteBoard)
}
