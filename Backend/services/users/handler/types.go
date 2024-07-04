package handler

import (
	usersModels "board-buddy/services/users/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

//* RegisterUser

type LoadUserRequest struct {
	ID uint `json:"id" validate:"required"`
}

func (r *LoadUserRequest) bind(ctx echo.Context) *echo.HTTPError {
	if err := ctx.Bind(r); err != nil {
		ctx.Logger().Debug("context bind error", err)
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err.Error())
	}

	if err := ctx.Validate(r); err != nil {
		ctx.Logger().Debug("context validate error", err)
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err.Error())
	}

	return nil
}

type LoadUserResponse struct {
	User usersModels.ApiUser `json:"user"`
}

func NewLoadUserResponse(u *usersModels.User) *LoadUserResponse {
	if u == nil {
		return nil
	}

	var res LoadUserResponse
	res.User.Username = u.Username
	res.User.Email = u.Email
	return &res
}
