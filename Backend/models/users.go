package models

import (
	"gorm.io/gorm"
)

// @internal
type User struct {
	gorm.Model
	Username     string       `gorm:"unique;not null" json:"username"`
	Email        string       `gorm:"unique;not null" json:"email"`
	PasswordHash string       `gorm:"not null" json:"password_hash"`
	Workspaces   []*Workspace `gorm:"many2many:workspace_members"`
	// Image        *string
}

//todo:
// func (u *User) GetUserName() string {
// 	if u != nil {
// 		return u.Username
// 	}
// 	return ""
// }

// @API
type ApiUser struct {
	ID       uint   `json:"id" validate:"required"`
	Username string `json:"username" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
}
