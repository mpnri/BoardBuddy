package auth

import (
	"board-buddy/models"
	"board-buddy/services/auth/utils"
	users "board-buddy/services/users/module"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
)

type AuthModule struct {
	db          *gorm.DB
	usersModule *users.UsersModule
}

func NewAuthModule(db *gorm.DB, usersModule *users.UsersModule) *AuthModule {
	return &AuthModule{db, usersModule}
}

func (m *AuthModule) RegisterUser(ctx echo.Context, userName string, email string, password string) (*models.User, *echo.HTTPError) {
	hashedPassword, e := utils.HashPassword(password)
	if e != nil {
		return nil, echo.NewHTTPError(http.StatusUnprocessableEntity, e.Error())
	}

	user, err := m.usersModule.CreateUser(ctx, &users.CreateUserData{
		Name: userName, Email: email, PasswordHash: hashedPassword,
	})
	return user, err
}

func (m *AuthModule) LoginUser(ctx echo.Context, email string, password string) (*models.User, *echo.HTTPError) {
	user := models.User{}
	if err := m.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	isTheSameUser := utils.CheckPassword(user.PasswordHash, password)
	if !isTheSameUser {
		return nil, echo.NewHTTPError(http.StatusForbidden, "password in incorrect")
	}
	return &user, nil
}

func (m *AuthModule) GetMe(ctx echo.Context, userID uint) (*models.User, *echo.HTTPError) {
	user, err := m.usersModule.GetUserByID(ctx, userID)
	return user, err
}
