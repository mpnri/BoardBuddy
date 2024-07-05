package handler

import (
	cards "board-buddy/services/cards/module"
	"board-buddy/services/utils"
	"net/http"

	"github.com/labstack/echo/v4"
)

type CardsHandlerImpl struct {
	cardsModule *cards.CardsModule
}

func NewCardsHandlerImpl(cardsModule *cards.CardsModule) *CardsHandlerImpl {
	return &CardsHandlerImpl{cardsModule}
}

// func (u *CardsHandlerImpl) LoadAllCards(ctx echo.Context) error {
// 	userID := utils.GetUserIDFromToken(ctx)
// 	cards, err := u.cardsModule.GetAllCards(ctx, userID)
// 	return utils.HandleEchoResponse(ctx, NewLoadAllCardResponse(cards), err)
// }

func (u *CardsHandlerImpl) LoadCard(ctx echo.Context) error {
	userID := utils.GetUserIDFromToken(ctx)
	cID, error := utils.GetUintParam(ctx, "id")
	if error != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, error)
	}

	card, err := u.cardsModule.GetCardByID(ctx, userID, cID)
	return utils.HandleEchoResponse(ctx, NewLoadCardResponse(card), err)
}

func (u *CardsHandlerImpl) CreateCard(ctx echo.Context) error {
	userID := utils.GetUserIDFromToken(ctx)
	req := &CreateCardRequest{}
	if err := req.bind(ctx); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, err)
	}
	req.Card.CreatorID = userID
	_, err := u.cardsModule.CreateCard(ctx, &req.Card)
	return utils.HandleEchoResponse(ctx, "ok", err)
}

func (u *CardsHandlerImpl) DeleteCard(ctx echo.Context) error {
	userID := utils.GetUserIDFromToken(ctx)
	wID, error := utils.GetUintParam(ctx, "id")
	if error != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, error)
	}

	err := u.cardsModule.DeleteCard(ctx, userID, wID)
	return utils.HandleEchoResponse(ctx, "ok", err)
}
