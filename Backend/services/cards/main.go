package mainCards

import (
	"board-buddy/router/middleware"
	users "board-buddy/services/users/module"
	"board-buddy/services/cards/handler"
	"board-buddy/services/cards/module"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Setup(e *echo.Echo, db *gorm.DB) {
	g := e.Group("/cards", middleware.CreateDefaultTokenMiddleWare())

	usersModule := users.NewUsersModule(db)
	cardsModule := cards.NewCardsModule(db, usersModule)

	cardsHandler := handler.NewCardsHandlerImpl(cardsModule)

	// g.GET("", cardsHandler.LoadAllCards)
	g.POST("", cardsHandler.CreateCard)
	g.GET("/:id", cardsHandler.LoadCard)
	g.DELETE("/:id", cardsHandler.DeleteCard)
	g.PUT("/:id/title", cardsHandler.ChangeCardTitle)
}
