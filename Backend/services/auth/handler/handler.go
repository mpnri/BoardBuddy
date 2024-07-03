package handler

import (
	auth "board-buddy/services/auth/module"
	globalUtils "board-buddy/services/utils"
	"net/http"

	"github.com/labstack/echo/v4"
)

type AuthHandlerImpl struct {
	authModule *auth.AuthModule
}

func NewAuthHandlerImpl(authModule *auth.AuthModule) *AuthHandlerImpl {
	return &AuthHandlerImpl{authModule}
}

func (h *AuthHandlerImpl) RegisterUser(ctx echo.Context) error {
	ctx.Logger().Debug("RegisterUser")
	req := &RegisterUserRequest{}
	if err := req.bind(ctx); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, err)
	}

	user := req.User
	resUser, err := h.authModule.RegisterUser(ctx, user.Username, user.Email, user.Password)

	return globalUtils.HandleEchoResponse(ctx, NewRegisterAndLoginUserResponse(resUser), err)
}

func (h *AuthHandlerImpl) LoginUser(ctx echo.Context) error {
	ctx.Logger().Debug("LoginUser")
	req := &LoginUserRequest{}
	if err := req.bind(ctx); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, err)
	}

	reqUser := req.User
	resUser, err := h.authModule.LoginUser(ctx, reqUser.Email, reqUser.Password)

	return globalUtils.HandleEchoResponse(ctx, NewRegisterAndLoginUserResponse(resUser), err)
}
