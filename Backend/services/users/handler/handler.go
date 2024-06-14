package handler

import (
	"board-buddy/services/users/internal/users"
	"net/http"

	"github.com/labstack/echo/v4"
)

type UsersHandlerImpl struct {
	usersModule *users.UsersModule
}

func NewMeetHandlerImpl(usersModule *users.UsersModule) *UsersHandlerImpl {
	return &UsersHandlerImpl{usersModule}
}

func (u *UsersHandlerImpl) LoadAllUsers(ctx echo.Context) error {
	//todo: prepare context
	users, err := u.usersModule.GetAllUsers(ctx)
	if err != nil {
		return err
	}
	//todo: use request and response binder
	return ctx.JSON(http.StatusOK, users)
}
