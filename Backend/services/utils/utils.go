package utils

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func HandleEchoResponse(ctx echo.Context, response any, err *echo.HTTPError) error {
	if err != nil {
		return ctx.JSON(err.Code, err)
	}
	return ctx.JSON(http.StatusOK, response)
}

func GetUintParam(ctx echo.Context, name string) (uint, error) {
	val, err := strconv.Atoi(ctx.Param(name))
	if err != nil {
		return 0, err
	}
	if val < 0 {
		return 0, errors.New("negative param " + name)
	}
	return uint(val), nil
}
