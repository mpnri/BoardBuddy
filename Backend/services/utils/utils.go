package utils

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func HandleEchoResponse(ctx echo.Context, response any, err *echo.HTTPError) error {
	if err != nil {
		return ctx.JSON(err.Code, err)
	}
	return ctx.JSON(http.StatusOK, response)
}


