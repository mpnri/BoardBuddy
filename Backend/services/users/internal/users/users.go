package users

import (
	"board-buddy/services/users/models"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type UsersModule struct {
	db *gorm.DB
}

func NewUsersModule(db *gorm.DB) *UsersModule {
	return &UsersModule{db}
}

func (m *UsersModule) GetAllUsers(ctx echo.Context) ([]*models.User, error) {
	var users []*models.User
	if m.db.Limit(50).Find(&users).Error != nil {
		return nil, echo.ErrInternalServerError
	}
	return users, nil
}
