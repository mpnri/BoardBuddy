package auth

import (
	"board-buddy/services/auth/utils"
	usersModels "board-buddy/services/users/models"
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

func (m *AuthModule) RegisterUser(ctx echo.Context, userName string, email string, password string) (*usersModels.User, *echo.HTTPError) {
	hashedPassword, e := utils.HashPassword(password)
	if e != nil {
		return nil, echo.NewHTTPError(http.StatusUnprocessableEntity, e.Error())
	}

	user, err := m.usersModule.CreateUser(ctx, &users.CreateUserData{
		Name: userName, Email: email, PasswordHash: hashedPassword,
	})
	return user, err
}

func (m *AuthModule) LoginUser(ctx echo.Context, email string, password string) (*usersModels.User, *echo.HTTPError) {
	user := usersModels.User{Email: email}
	if err := m.db.First(&user).Error; err != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	isTheSameUser := utils.CheckPassword(user.PasswordHash, password)
	if !isTheSameUser {
		return nil, echo.NewHTTPError(http.StatusForbidden, "password in incorrect")
	}
	return &user, nil
}
