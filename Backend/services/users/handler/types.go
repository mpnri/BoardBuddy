package handler

import (
	"board-buddy/models"
)

type LoadUserResponse struct {
	User models.ApiUser `json:"user"`
}

func NewLoadUserResponse(u *models.User) *LoadUserResponse {
	if u == nil {
		return nil
	}

	var res LoadUserResponse
	res.User.ID = u.ID
	res.User.Username = u.Username
	res.User.Email = u.Email
	return &res
}
