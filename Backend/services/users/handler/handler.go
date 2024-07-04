package handler

import (
	"board-buddy/services/users/module"
	"board-buddy/services/utils"
	"net/http"

	"github.com/labstack/echo/v4"
)

type UsersHandlerImpl struct {
	usersModule *users.UsersModule
}

func NewUsersHandlerImpl(usersModule *users.UsersModule) *UsersHandlerImpl {
	return &UsersHandlerImpl{usersModule}
}

// todo: restricted
func (u *UsersHandlerImpl) LoadAllUsers(ctx echo.Context) error {
	//todo: prepare context
	users, err := u.usersModule.GetAllUsers(ctx)
	if err != nil {
		return err
	}
	//todo: use request and response binder
	return ctx.JSON(http.StatusOK, users)
}

func (u *UsersHandlerImpl) LoadUser(ctx echo.Context) error {
	req := &LoadUserRequest{}
	if err := req.bind(ctx); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, err)
	}

	user, err := u.usersModule.GetUserByID(ctx, req.ID)
	
	return utils.HandleEchoResponse(ctx, NewLoadUserResponse(user), err)
}

