package router

import (
	auth "board-buddy/services/auth"
	boards "board-buddy/services/boards"
	cards "board-buddy/services/cards"
	lists "board-buddy/services/lists"
	users "board-buddy/services/users"
	workspaces "board-buddy/services/workspaces"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"

	"gorm.io/gorm"
)

func SetupRoutes(e *echo.Echo, db *gorm.DB) {
	e.Pre(middleware.RemoveTrailingSlash())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:3005"},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
		AllowMethods:     []string{echo.GET, echo.HEAD, echo.PUT, echo.POST, echo.DELETE},
		AllowCredentials: true,
	}))
	e.Validator = newValidator()

	users.Setup(e, db)
	auth.Setup(e, db)
	workspaces.Setup(e, db)
	boards.Setup(e, db)
	cards.Setup(e, db)
	lists.Setup(e, db)

	e.Logger.SetLevel(log.DEBUG)
	e.Logger.Fatal(e.Start(":3005"))
}
