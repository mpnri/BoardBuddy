package handler

import (
	"board-buddy/services/auth/module"
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
	err := h.authModule.RegisterUser(ctx, user.Username, user.Email, user.Password)

	return globalUtils.HandleEchoResponse(ctx, "OK", err)
}
