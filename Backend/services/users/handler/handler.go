package handler

import (
	"board-buddy/services/users/module"
	"board-buddy/services/utils"

	"github.com/labstack/echo/v4"
	"net/http"
)

type UsersHandlerImpl struct {
	usersModule *users.UsersModule
}

func NewUsersHandlerImpl(usersModule *users.UsersModule) *UsersHandlerImpl {
	return &UsersHandlerImpl{usersModule}
}

// todo: add role for admin
func (u *UsersHandlerImpl) LoadAllUsers(ctx echo.Context) error {
	users, err := u.usersModule.GetAllUsers(ctx)
	return utils.HandleEchoResponse(ctx, users, err)
}

func (u *UsersHandlerImpl) LoadUser(ctx echo.Context) error {
	uID, error := utils.GetUintParam(ctx, "id")
	if error != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, error)
	}

	user, err := u.usersModule.GetUserByID(ctx, uID)
	return utils.HandleEchoResponse(ctx, NewLoadUserResponse(user), err)
}
