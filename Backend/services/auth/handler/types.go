package handler

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

type RegisterUserRequest struct {
	User *struct {
		Username string `json:"username" validate:"required"`
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
	} `json:"user" validate:"required"`
}

func (r *RegisterUserRequest) bind(ctx echo.Context) error {
	if err := ctx.Bind(r); err != nil {
		ctx.Logger().Debug("context bind error", err)
		return err
	}

	if err := ctx.Validate(r); err != nil {
		ctx.Logger().Debug("context validate error", err)
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err.Error())
	}

	return nil
}
