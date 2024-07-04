package handler

import (
	"board-buddy/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

//* LoadWorkspace

type LoadWorkspaceRequest struct {
	ID uint `json:"id" validate:"required"`
}

func (r *LoadWorkspaceRequest) bind(ctx echo.Context) *echo.HTTPError {
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

//* DeleteWorkspace

type DeleteWorkspaceRequest struct {
	ID uint `json:"id" validate:"required"`
}

func (r *DeleteWorkspaceRequest) bind(ctx echo.Context) *echo.HTTPError {
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
