package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username     string `gorm:"unique_index;not null" json:"username"`
	Email        string `gorm:"unique_index;not null" json:"email"`
	PasswordHash string `gorm:"not null" json:"password_hash"`
	// Image        *string
}
