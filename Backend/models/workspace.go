package models

import (
	"gorm.io/gorm"
)

// @internal
type Workspace struct {
	gorm.Model
	Name        string `gorm:"not null" json:"name"`
	Description string `json:"description"`
	OwnerID     uint
	Owner       User    `gorm:"foreignKey:OwnerID"`
	Members     []*User `gorm:"many2many:workspace_members"`
	Boards      []Board
}

// @API
type ApiWorkspace struct {
	ID          uint       `json:"id" validate:"required"`
	Name        string     `json:"name" validate:"required"`
	Description string     `json:"description"`
	AmIOwner    bool       `json:"amIOwner"`
	AmIMember   bool       `json:"amIMember"`
	Boards      []*ApiBoard `json:"boards"`
}
