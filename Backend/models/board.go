package models

import (
	"gorm.io/gorm"
)

// @internal
type Board struct {
	gorm.Model
	Name string `gorm:"not null" json:"name"`

	WorkspaceID uint      `gorm:"not null"`
	Workspace   Workspace `gorm:"foreignKey:WorkspaceID"`

	Cards []Card
	Lists []List
}

// @API
type ApiBoard struct {
	ID          uint      `json:"id" validate:"required"`
	Name        string    `json:"name" validate:"required"`
	WorkspaceID uint      `json:"workspaceID" validate:"required"`
	Cards       []*ApiCard `json:"cards" validate:"required"`
}
