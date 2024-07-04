package handler

import (
	usersModels "board-buddy/services/users/models"
	"board-buddy/services/utils"
	"github.com/labstack/echo/v4"
	"net/http"
)

//* RegisterUser

type RegisterUserRequest struct {
	Username string `json:"username" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (r *RegisterUserRequest) bind(ctx echo.Context) *echo.HTTPError {
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

type RegisterAndLoginUserResponse struct {
	User usersModels.ApiUser `json:"user"`
	Token string `json:"token"`
}

func NewRegisterAndLoginUserResponse(u *usersModels.User) *RegisterAndLoginUserResponse {
	if u == nil {
		return nil
	}

	var res RegisterAndLoginUserResponse
	res.User.Username = u.Username
	res.User.Email = u.Email
	res.Token = utils.GenerateJWT(u.ID)
	return &res
}

//* LoginUser

type LoginUserRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (r *LoginUserRequest) bind(ctx echo.Context) error {
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
