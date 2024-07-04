package handler

import (
	"board-buddy/services/utils"
	"board-buddy/services/workspaces/module"
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
	userID := utils.UserIDFromToken(ctx)
	workspaces, err := u.workspacesModule.GetAllWorkspaces(ctx, userID)
	return utils.HandleEchoResponse(ctx, workspaces, err)
}

func (u *WorkspacesHandlerImpl) LoadWorkspace(ctx echo.Context) error {
	userID := utils.UserIDFromToken(ctx)
	req := &LoadWorkspaceRequest{}
	if err := req.bind(ctx); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, err)
	}

	workspace, err := u.workspacesModule.GetWorkspaceByID(ctx, userID, req.ID)
	return utils.HandleEchoResponse(ctx, NewLoadWorkspaceResponse(workspace), err)
}

func (u *WorkspacesHandlerImpl) CreateWorkspace(ctx echo.Context) error {
	userID := utils.UserIDFromToken(ctx)
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
	userID := utils.UserIDFromToken(ctx)
	req := &DeleteWorkspaceRequest{}
	if err := req.bind(ctx); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, err)
	}

	err := u.workspacesModule.DeleteWorkspace(ctx, userID, req.ID)
	return utils.HandleEchoResponse(ctx, "ok", err)
}
