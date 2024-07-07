package handler

import (
	lists "board-buddy/services/lists/module"
	"board-buddy/services/utils"
	"net/http"

	"github.com/labstack/echo/v4"
)

type ListsHandlerImpl struct {
	listsModule *lists.ListsModule
}

func NewListsHandlerImpl(listsModule *lists.ListsModule) *ListsHandlerImpl {
	return &ListsHandlerImpl{listsModule}
}

// func (u *ListsHandlerImpl) LoadAllLists(ctx echo.Context) error {
// 	userID := utils.GetUserIDFromToken(ctx)
// 	lists, err := u.listsModule.GetAllLists(ctx, userID)
// 	return utils.HandleEchoResponse(ctx, NewLoadAllListResponse(lists), err)
// }

// func (u *ListsHandlerImpl) LoadList(ctx echo.Context) error {
// 	userID := utils.GetUserIDFromToken(ctx)
// 	cID, error := utils.GetUintParam(ctx, "id")
// 	if error != nil {
// 		return ctx.JSON(http.StatusUnprocessableEntity, error)
// 	}

// 	list, err := u.listsModule.GetListByID(ctx, userID, cID)
// 	return utils.HandleEchoResponse(ctx, NewLoadListResponse(list), err)
// }

func (u *ListsHandlerImpl) CreateList(ctx echo.Context) error {
	userID := utils.GetUserIDFromToken(ctx)
	req := &CreateListRequest{}
	if err := req.bind(ctx); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, err)
	}

	list, err := u.listsModule.CreateList(ctx, &req.List, userID)
	return utils.HandleEchoResponse(ctx, NewCreateListResponse(list), err)
}

func (u *ListsHandlerImpl) DeleteList(ctx echo.Context) error {
	userID := utils.GetUserIDFromToken(ctx)
	lID, error := utils.GetUintParam(ctx, "id")
	if error != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, error)
	}

	err := u.listsModule.DeleteList(ctx, userID, lID)
	return utils.HandleEchoResponse(ctx, "ok", err)
}
