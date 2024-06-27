package auth

import (
	"board-buddy/services/auth/utils"
	users "board-buddy/services/users/module"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type AuthModule struct {
	db          *gorm.DB
	usersModule *users.UsersModule
}

func NewAuthModule(db *gorm.DB, usersModule *users.UsersModule) *AuthModule {
	return &AuthModule{db, usersModule}
}

func (m *AuthModule) RegisterUser(ctx echo.Context, userName string, email string, password string) *echo.HTTPError {
	hashedPassword, e := utils.HashPassword(password)
	if e != nil {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, e.Error())
	}

	_, err := m.usersModule.CreateUser(ctx, &users.CreateUserData{
		Name: userName, Email: email, PasswordHash: hashedPassword,
	})
	return err
}
