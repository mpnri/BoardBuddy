package handler

import (
	auth "board-buddy/services/auth/module"
	usersHandler "board-buddy/services/users/handler"
	"board-buddy/services/utils"
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

	resUser, err := h.authModule.RegisterUser(
		ctx, req.Username, req.Email, req.Password,
	)

	return utils.HandleEchoResponse(ctx, NewRegisterAndLoginUserResponse(resUser), err)
}

func (h *AuthHandlerImpl) LoginUser(ctx echo.Context) error {
	ctx.Logger().Debug("LoginUser")
	req := &LoginUserRequest{}
	if err := req.bind(ctx); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, err)
	}

	resUser, err := h.authModule.LoginUser(ctx, req.Email, req.Password)

	return utils.HandleEchoResponse(ctx, NewRegisterAndLoginUserResponse(resUser), err)
}

func (h *AuthHandlerImpl) GetMe(ctx echo.Context) error {
	user, err := h.authModule.GetMe(ctx, utils.GetUserIDFromToken(ctx))
	return utils.HandleEchoResponse(ctx, usersHandler.NewLoadUserResponse(user), err)
}
