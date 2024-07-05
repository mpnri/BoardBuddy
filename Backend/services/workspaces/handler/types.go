package handler

import (
	"board-buddy/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

//* LoadWorkspace

type LoadWorkspaceResponse struct {
	Workspace models.ApiWorkspace `json:"workspace"`
}

func NewLoadWorkspaceResponse(w *models.ApiWorkspace) *LoadWorkspaceResponse {
	if w == nil {
		return nil
	}
	var res LoadWorkspaceResponse
	res.Workspace = *w
	return &res
}

// * LoadAllWorkspaces

type LoadAllWorkspaceResponse struct {
	Workspaces []*models.ApiWorkspace `json:"workspaces"`
}

func NewLoadAllWorkspaceResponse(ws []*models.ApiWorkspace) *LoadAllWorkspaceResponse {
	var res LoadAllWorkspaceResponse
	res.Workspaces = ws
	return &res
}

//* CreateWorkspace

type CreateWorkspaceRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description"`
}

func (r *CreateWorkspaceRequest) bind(ctx echo.Context) *echo.HTTPError {
	if err := ctx.Bind(r); err != nil {
		ctx.Logger().Debug("context bind error", err)
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err.Error())
	}

	if err := ctx.Validate(r); err != nil {
		ctx.Logger().Debug("context validate error", err)
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err.Error())
	}

	return nil
}

