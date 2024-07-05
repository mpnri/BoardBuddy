package handler

import (
	"board-buddy/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

//* LoadBoard

type LoadBoardResponse struct {
	Board models.ApiBoard `json:"board"`
}

func NewLoadBoardResponse(w *models.ApiBoard) *LoadBoardResponse {
	if w == nil {
		return nil
	}
	var res LoadBoardResponse
	res.Board = *w
	return &res
}

// * LoadAllBoards

type LoadAllBoardResponse struct {
	Boards []*models.ApiBoard `json:"boards"`
}

func NewLoadAllBoardResponse(ws []*models.ApiBoard) *LoadAllBoardResponse {
	var res LoadAllBoardResponse
	res.Boards = ws
	return &res
}

//* CreateBoard

type CreateBoardRequest struct {
	Name        string `json:"name" validate:"required"`
	WorkspaceID uint `json:"workspaceID"`
}

func (r *CreateBoardRequest) bind(ctx echo.Context) *echo.HTTPError {
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
