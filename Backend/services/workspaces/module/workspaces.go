package workspaces

import (
	"board-buddy/models"
	users "board-buddy/services/users/module"
	"errors"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type WorkspacesModule struct {
	db          *gorm.DB
	usersModule *users.UsersModule
}

func NewWorkspacesModule(db *gorm.DB, usersModule *users.UsersModule) *WorkspacesModule {
	return &WorkspacesModule{db, usersModule}
}

func (m *WorkspacesModule) GetAllWorkspaces(ctx echo.Context, userID uint) ([]*models.ApiWorkspace, *echo.HTTPError) {
	var user models.User
	if m.db.Limit(20).Preload("Workspaces").Find(&user, userID).Error != nil {
		return nil, echo.ErrInternalServerError
	}

	workspaces := []*models.ApiWorkspace{}
	for _, w := range user.Workspaces {
		if w == nil {
			ctx.Logger().Warn("nil workspace for " + fmt.Sprint(userID))
			continue
		}

		workspaces = append(workspaces, &models.ApiWorkspace{
			ID:          w.ID,
			Name:        w.Name,
			Description: w.Description,
			AmIOwner:    w.OwnerID == userID,
			AmIMember:   true,
		})
	}
	return workspaces, nil
}

func (m *WorkspacesModule) GetWorkspaceByID(ctx echo.Context, userID uint, wID uint) (*models.ApiWorkspace, *echo.HTTPError) {
	var workspace *models.Workspace
	if err := m.db.First(&workspace, wID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, echo.ErrNotFound
		}
		ctx.Logger().Debug("load workspace err", err)
		return nil, echo.ErrInternalServerError
	}
	return &models.ApiWorkspace{
		ID:          workspace.ID,
		Name:        workspace.Name,
		Description: workspace.Description,
		AmIOwner:    workspace.OwnerID == userID,
		AmIMember:   true,
	}, nil
}

type CreateWorkspaceData struct {
	Name        string
	Description string
	OwnerID     uint
}

func (m *WorkspacesModule) CreateWorkspace(ctx echo.Context, data *CreateWorkspaceData) (*models.Workspace, *echo.HTTPError) {
	user, err := m.usersModule.GetUserByID(ctx, data.OwnerID)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err)
	}

	newWorkspace := models.Workspace{
		Name:        data.Name,
		Description: data.Description,
		OwnerID:     data.OwnerID,
		Members:     []*models.User{user},
	}
	if res := m.db.Create(&newWorkspace); res.Error != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}
	return &newWorkspace, nil
}

func (m *WorkspacesModule) DeleteWorkspace(ctx echo.Context, userID uint, wID uint) *echo.HTTPError {
	var workspace models.Workspace
	if res := m.db.Take(&workspace, wID); res.Error != nil {
		if errors.Is(res.Error, gorm.ErrRecordNotFound) {
			return echo.ErrNotFound
		}
		return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}

	if workspace.OwnerID != userID {
		return echo.NewHTTPError(http.StatusForbidden, "your not workspace owner")
	}

	if res := m.db.Delete(&models.Workspace{}, wID); res.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}
	return nil
}
