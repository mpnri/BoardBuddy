package handler

import (
	"board-buddy/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

//* LoadCard

type LoadCardResponse struct {
	Card models.ApiCard `json:"card"`
}

func NewLoadCardResponse(w *models.ApiCard) *LoadCardResponse {
	if w == nil {
		return nil
	}
	var res LoadCardResponse
	res.Card = *w
	return &res
}

// * LoadAllCards

type LoadAllCardResponse struct {
	Cards []*models.ApiCard `json:"cards"`
}

func NewLoadAllCardResponse(ws []*models.ApiCard) *LoadAllCardResponse {
	var res LoadAllCardResponse
	res.Cards = ws
	return &res
}

//* CreateCard

type CreateCardRequest struct {
	Card models.ApiCard `json:"card" validate:"required"`
}

func (r *CreateCardRequest) bind(ctx echo.Context) *echo.HTTPError {
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

type CreateCardResponse struct {
	Card *models.ApiCard `json:"card"`
}

func NewCreateCardResponse(ws *models.ApiCard) *CreateCardResponse {
	var res CreateCardResponse
	res.Card = ws
	return &res
}

//* ChangeCardTitle

type ChangeCardTitleRequest struct {
	Title string `json:"title" validate:"required"`
}

func (r *ChangeCardTitleRequest) bind(ctx echo.Context) *echo.HTTPError {
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

