package users

import (
	"board-buddy/models"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type UsersModule struct {
	db *gorm.DB
}

func NewUsersModule(db *gorm.DB) *UsersModule {
	return &UsersModule{db}
}

func (m *UsersModule) GetAllUsers(ctx echo.Context) ([]*models.User, *echo.HTTPError) {
	var users []*models.User
	if m.db.Limit(50).Find(&users).Error != nil {
		return nil, echo.ErrInternalServerError
	}
	return users, nil
}

func (m *UsersModule) GetUserByID(ctx echo.Context, id uint) (*models.User, *echo.HTTPError) {
	var user *models.User
	if err := m.db.First(&user, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, echo.ErrNotFound
		}
		ctx.Logger().Debug("load user err", err)
		return nil, echo.ErrInternalServerError
	}
	return user, nil
}

type CreateUserData struct {
	Name         string
	Email        string
	PasswordHash string
}

func (m *UsersModule) CreateUser(ctx echo.Context, userData *CreateUserData) (*models.User, *echo.HTTPError) {
	//todo: validate
	newUser := models.User{
		Username:     userData.Name,
		Email:        userData.Email,
		PasswordHash: userData.PasswordHash,
	}
	if res := m.db.Create(&newUser); res.Error != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}
	return &newUser, nil
}
