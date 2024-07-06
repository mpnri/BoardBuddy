package models

import (
	"gorm.io/gorm"
)

// @internal
type List struct {
	gorm.Model
	Title string `gorm:"not null" json:"title"`

	BoardID uint  `gorm:"not null"`
	Board   Board `gorm:"foreignKey:BoardID"`

	Order uint `gorm:"not null"`

	Cards []Card
}

// @API
type ApiList struct {
	ID          uint   `json:"id" validate:"required"`
	Title       string `gorm:"not null" json:"title"`

	BoardID uint `json:"boardID" validate:"required"`

	Order uint `json:"order" validate:"required"`
}
