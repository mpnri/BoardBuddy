package handler

import (
	boards "board-buddy/services/boards/module"
	"board-buddy/services/utils"
	"net/http"

	"github.com/labstack/echo/v4"
)

type BoardsHandlerImpl struct {
	boardsModule *boards.BoardsModule
}

func NewBoardsHandlerImpl(boardsModule *boards.BoardsModule) *BoardsHandlerImpl {
	return &BoardsHandlerImpl{boardsModule}
}

// func (u *BoardsHandlerImpl) LoadAllBoards(ctx echo.Context) error {
// 	userID := utils.GetUserIDFromToken(ctx)
// 	boards, err := u.boardsModule.GetAllBoards(ctx, userID)
// 	return utils.HandleEchoResponse(ctx, NewLoadAllBoardResponse(boards), err)
// }

func (u *BoardsHandlerImpl) LoadBoard(ctx echo.Context) error {
	userID := utils.GetUserIDFromToken(ctx)
	bID, error := utils.GetUintParam(ctx, "id")
	if error != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, error)
	}

	board, err := u.boardsModule.GetBoardByID(ctx, userID, bID)
	return utils.HandleEchoResponse(ctx, NewLoadBoardResponse(board), err)
}

func (u *BoardsHandlerImpl) CreateBoard(ctx echo.Context) error {
	userID := utils.GetUserIDFromToken(ctx)
	req := &CreateBoardRequest{}
	if err := req.bind(ctx); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, err)
	}

	_, err := u.boardsModule.CreateBoard(ctx, &boards.CreateBoardData{
		Name:        req.Name,
		WorkspaceID: req.WorkspaceID,
		UserID:      userID,
	})
	return utils.HandleEchoResponse(ctx, "ok", err)
}

func (u *BoardsHandlerImpl) DeleteBoard(ctx echo.Context) error {
	userID := utils.GetUserIDFromToken(ctx)
	wID, error := utils.GetUintParam(ctx, "id")
	if error != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, error)
	}

	err := u.boardsModule.DeleteBoard(ctx, userID, wID)
	return utils.HandleEchoResponse(ctx, "ok", err)
}

func (u *BoardsHandlerImpl) LoadAllListsByBoardID(ctx echo.Context) error {
	userID := utils.GetUserIDFromToken(ctx)
	bID, error := utils.GetUintParam(ctx, "id")
	if error != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, error)
	}

	lists, err := u.boardsModule.GetAllListsByBoardID(ctx, userID, bID)
	return utils.HandleEchoResponse(ctx, NewLoadAllListResponse(lists), err)
}
