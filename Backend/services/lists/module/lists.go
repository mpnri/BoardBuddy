package lists

import (
	"board-buddy/models"
	listsUtils "board-buddy/services/lists/utils"
	users "board-buddy/services/users/module"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type ListsModule struct {
	db          *gorm.DB
	usersModule *users.UsersModule
}

func NewListsModule(db *gorm.DB, usersModule *users.UsersModule) *ListsModule {
	return &ListsModule{db, usersModule}
}

// func (m *ListsModule) GetAllListsByWorkspaceID(ctx echo.Context, userID uint, workspaceID uint) ([]*models.ApiList, *echo.HTTPError) {
// 	var user models.User
// 	if m.db.Limit(20).Preload("Lists").Find(&user, userID).Error != nil {
// 		return nil, echo.ErrInternalServerError
// 	}

// 	lists := []*models.ApiList{}
// 	for _, w := range user.Lists {
// 		if w == nil {
// 			ctx.Logger().Warn("nil list for " + fmt.Sprint(userID))
// 			continue
// 		}

// 		lists = append(lists, &models.ApiList{
// 			ID:          w.ID,
// 			Name:        w.Name,
// 			Description: w.Description,
// 			AmIOwner:    w.OwnerID == userID,
// 			AmIMember:   true,
// 		})
// 	}
// 	return lists, nil
// }

// func (m *ListsModule) GetListByID(ctx echo.Context, userID uint, listID uint) (*models.ApiList, *echo.HTTPError) {
// 	var list *models.List
// 	if err := m.db.Preload("Lists").First(&list, listID).Error; err != nil {
// 		if errors.Is(err, gorm.ErrRecordNotFound) {
// 			return nil, echo.ErrNotFound
// 		}
// 		ctx.Logger().Debug("load list err", err)
// 		return nil, echo.ErrInternalServerError
// 	}

// 	//todo: check if the user is a member of workspace

// 	return &models.ApiList{
// 		ID:          list.ID,
// 		Title:       list.Title,
// 		Description: list.Description,
// 		BoardID:     list.BoardID,
// 		CreatorID:   list.CreatorID,
// 		ListID:      list.ListID,
// 	}, nil
// }

func (m *ListsModule) CreateList(ctx echo.Context, data *models.ApiList, userUD uint) (*models.List, *echo.HTTPError) {
	//todo: check if the user is a member of board and workspace
	// user, err := m.usersModule.GetUserByID(ctx, data.OwnerID)
	// if err != nil {
	// 	return nil, echo.NewHTTPError(http.StatusBadRequest, err)
	// }
	maxOrder := 0
	if res := m.db.Model(&models.List{}).Select("MAX(order)").Scan(&maxOrder); res.Error != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	} else if res.RowsAffected == 0 {
		maxOrder = 0
	}

	data.Order = uint(maxOrder) + 1
	newList := listsUtils.MapApiListToList(data)
	if res := m.db.Create(&newList); res.Error != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}
	return &newList, nil
}

func (m *ListsModule) DeleteList(ctx echo.Context, userID uint, lID uint) *echo.HTTPError {
	var list models.List
	if res := m.db.Take(&list, lID); res.Error != nil {
		if errors.Is(res.Error, gorm.ErrRecordNotFound) {
			return echo.ErrNotFound
		}
		return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}

	//todo: check membership in workspace
	// if list.OwnerID != userID {
	// 	return echo.NewHTTPError(http.StatusForbidden, "your not list owner")
	// }

	if res := m.db.Delete(&models.List{}, lID); res.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}
	return nil
}
