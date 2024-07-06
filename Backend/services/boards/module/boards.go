package boards

import (
	"board-buddy/models"
	cardUtils "board-buddy/services/cards/utils"
	lists "board-buddy/services/lists/module"
	listsUtils "board-buddy/services/lists/utils"
	users "board-buddy/services/users/module"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type BoardsModule struct {
	db          *gorm.DB
	usersModule *users.UsersModule
	listsModule *lists.ListsModule
}

func NewBoardsModule(db *gorm.DB, usersModule *users.UsersModule, listsModule *lists.ListsModule) *BoardsModule {
	return &BoardsModule{db, usersModule, listsModule}
}

// func (m *BoardsModule) GetAllBoards(ctx echo.Context, userID uint) ([]*models.ApiBoard, *echo.HTTPError) {
// 	var user models.User
// 	if m.db.Limit(20).Preload("Boards").Find(&user, userID).Error != nil {
// 		return nil, echo.ErrInternalServerError
// 	}

// 	boards := []*models.ApiBoard{}
// 	for _, w := range user.Boards {
// 		if w == nil {
// 			ctx.Logger().Warn("nil board for " + fmt.Sprint(userID))
// 			continue
// 		}

// 		boards = append(boards, &models.ApiBoard{
// 			ID:          w.ID,
// 			Name:        w.Name,
// 			Description: w.Description,
// 			AmIOwner:    w.OwnerID == userID,
// 			AmIMember:   true,
// 		})
// 	}
// 	return boards, nil
// }

func (m *BoardsModule) GetBoardByID(ctx echo.Context, userID uint, bID uint) (*models.ApiBoard, *echo.HTTPError) {
	var board *models.Board
	if err := m.db.Preload("Cards").Preload("Workspace").First(&board, bID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, echo.ErrNotFound
		}
		ctx.Logger().Debug("load board err", err)
		return nil, echo.ErrInternalServerError
	}

	//todo: check is member!

	return &models.ApiBoard{
		ID:          board.ID,
		Name:        board.Name,
		WorkspaceID: board.WorkspaceID,
		Cards:       cardUtils.MapCardsToApiCards(board.Cards),
	}, nil
}

type CreateBoardData struct {
	Name        string
	WorkspaceID uint
	UserID      uint
}

func (m *BoardsModule) CreateBoard(ctx echo.Context, data *CreateBoardData) (*models.Board, *echo.HTTPError) {
	_, err := m.usersModule.GetUserByID(ctx, data.UserID)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err)
	}

	newBoard := models.Board{
		Name:        data.Name,
		WorkspaceID: data.WorkspaceID,
		Cards:       []models.Card{},
	}
	if res := m.db.Create(&newBoard); res.Error != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}

	if list, err := m.listsModule.CreateList(ctx,
		&models.ApiList{Title: "ToDo", BoardID: newBoard.ID}, data.UserID); err != nil {
		// return nil, echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
		ctx.Logger().Debug("error creating first list")
	} else {
		newBoard.Lists = []models.List{*list}
	}
	return &newBoard, nil
}

func (m *BoardsModule) DeleteBoard(ctx echo.Context, userID uint, wID uint) *echo.HTTPError {
	var board models.Board
	if res := m.db.Preload("Workspaces").Take(&board, wID); res.Error != nil {
		if errors.Is(res.Error, gorm.ErrRecordNotFound) {
			return echo.ErrNotFound
		}
		return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}

	if board.Workspace.OwnerID != userID {
		return echo.NewHTTPError(http.StatusForbidden, "your not board owner")
	}

	//todo: delete all board cards and lists

	if res := m.db.Delete(&models.Board{}, wID); res.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}
	return nil
}

func (m *BoardsModule) GetAllListsByBoardID(ctx echo.Context, userID uint, boardID uint) ([]*models.ApiList, *echo.HTTPError) {
	var board models.Board
	if m.db.Limit(20).Preload("Lists").Preload("Workspace").Find(&board, userID).Error != nil {
		return nil, echo.ErrInternalServerError
	}

	//todo check workspace membership

	lists := listsUtils.MapListsToApiLists(board.Lists)
	return lists, nil
}