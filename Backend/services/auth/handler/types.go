package handler

import (
	usersModels "board-buddy/services/users/models"
	"board-buddy/services/utils"
	"net/http"

	"github.com/labstack/echo/v4"
)

//* RegisterUser

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

type RegisterUserResponse struct {
	User *struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Token    string `json:"token"`
	} `json:"user"`
}

func NewRegisterAndLoginUserResponse(u *usersModels.User) *RegisterUserResponse {
	var res RegisterUserResponse
	res.User.Username = u.Username
	res.User.Email = u.Email
	res.User.Token = utils.GenerateJWT(u.ID)
	return &res
}

//* LoginUser

type LoginUserRequest struct {
	User *struct {
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
	} `json:"user" validate:"required"`
}

func (r *LoginUserRequest) bind(ctx echo.Context) error {
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
