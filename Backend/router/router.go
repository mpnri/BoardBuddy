package router

import (
	auth "board-buddy/services/auth"
	users "board-buddy/services/users"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"

	"gorm.io/gorm"
)

func SetupRoutes(e *echo.Echo, db *gorm.DB) {
	e.Validator = newValidator()

	users.Setup(e, db)
	auth.Setup(e, db)

	e.Logger.SetLevel(log.DEBUG)
	e.Logger.Fatal(e.Start(":3005"))
}
