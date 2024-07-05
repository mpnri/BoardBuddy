package models

import (
	"gorm.io/gorm"
)

// @internal
type List struct {
	gorm.Model
	Title       string `gorm:"not null" json:"title"`

	BoardID uint  `gorm:"not null"`
	Board   Board `gorm:"foreignKey:BoardID"`

	
}

// @API
type ApiList struct {
	ID    uint   `json:"id" validate:"required"`
	Title string `gorm:"not null" json:"title"`
	Description string `json:"description"`

	BoardID uint `json:"boardID" validate:"required"`
}
