package handler

import (
	"board-buddy/services/utils"
	workspaces "board-buddy/services/workspaces/module"
	"net/http"

	"github.com/labstack/echo/v4"
)

type WorkspacesHandlerImpl struct {
	workspacesModule *workspaces.WorkspacesModule
}

func NewWorkspacesHandlerImpl(workspacesModule *workspaces.WorkspacesModule) *WorkspacesHandlerImpl {
	return &WorkspacesHandlerImpl{workspacesModule}
}

func (u *WorkspacesHandlerImpl) LoadAllWorkspaces(ctx echo.Context) error {
	userID := utils.GetUserIDFromToken(ctx)
	workspaces, err := u.workspacesModule.GetAllWorkspaces(ctx, userID)
	return utils.HandleEchoResponse(ctx, NewLoadAllWorkspaceResponse(workspaces), err)
}

func (u *WorkspacesHandlerImpl) LoadWorkspace(ctx echo.Context) error {
	userID := utils.GetUserIDFromToken(ctx)
	wID, error := utils.GetUintParam(ctx, "id")
	if error != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, error)
	}

	workspace, err := u.workspacesModule.GetWorkspaceByID(ctx, userID, wID)
	return utils.HandleEchoResponse(ctx, NewLoadWorkspaceResponse(workspace), err)
}

func (u *WorkspacesHandlerImpl) CreateWorkspace(ctx echo.Context) error {
	userID := utils.GetUserIDFromToken(ctx)
	req := &CreateWorkspaceRequest{}
	if err := req.bind(ctx); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, err)
	}

	_, err := u.workspacesModule.CreateWorkspace(ctx, &workspaces.CreateWorkspaceData{
		Name:        req.Name,
		Description: req.Description,
		OwnerID:     userID,
	})
	return utils.HandleEchoResponse(ctx, "ok", err)
}

func (u *WorkspacesHandlerImpl) DeleteWorkspace(ctx echo.Context) error {
	userID := utils.GetUserIDFromToken(ctx)
	wID, error := utils.GetUintParam(ctx, "id")
	if error != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, error)
	}

	err := u.workspacesModule.DeleteWorkspace(ctx, userID, wID)
	return utils.HandleEchoResponse(ctx, "ok", err)
}
