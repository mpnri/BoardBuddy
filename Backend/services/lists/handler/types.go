package handler

import (
	"board-buddy/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

//* LoadList

// type LoadListResponse struct {
// 	List models.ApiList `json:"list"`
// }

// func NewLoadListResponse(w *models.ApiList) *LoadListResponse {
// 	if w == nil {
// 		return nil
// 	}
// 	var res LoadListResponse
// 	res.List = *w
// 	return &res
// }

// * LoadAllLists

// type LoadAllListResponse struct {
// 	Lists []*models.ApiList `json:"lists"`
// }

// func NewLoadAllListResponse(ws []*models.ApiList) *LoadAllListResponse {
// 	var res LoadAllListResponse
// 	res.Lists = ws
// 	return &res
// }

//* CreateList

type CreateListRequest struct {
	List models.ApiList `json:"list" validate:"required"`
}

func (r *CreateListRequest) bind(ctx echo.Context) *echo.HTTPError {
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

type CreateListResponse struct {
	List *models.ApiList `json:"list"`
}

func NewCreateListResponse(ls *models.ApiList) *CreateListResponse {
	var res CreateListResponse
	res.List = ls
	return &res
}
