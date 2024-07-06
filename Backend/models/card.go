package models

import (
	"gorm.io/gorm"
)

// @internal
type Card struct {
	gorm.Model
	Title       string `gorm:"not null" json:"title"`
	Description string `json:"description"`

	BoardID uint  `gorm:"not null"`
	Board   Board `gorm:"foreignKey:BoardID"`

	CreatorID uint `gorm:"not null"`
	// Creator   User `gorm:"foreignKey:CreatorID"`

	ListID uint `gorm:"not null"`
	List   List `gorm:"foreignKey:ListID"`
	Order uint `gorm:"not null"`
}

// @API
type ApiCard struct {
	ID          uint   `json:"id" validate:"required"`
	Title       string `gorm:"not null" json:"title"`
	Description string `json:"description"`

	BoardID uint `json:"boardID" validate:"required"`
	CreatorID uint `json:"creatorID" validate:"required"`
	ListID uint `json:"listID" validate:"required"`

	Order uint `json:"order" validate:"required"`
}
