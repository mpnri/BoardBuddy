package cards

import (
	"board-buddy/models"
	cardsUtils "board-buddy/services/cards/utils"
	users "board-buddy/services/users/module"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type CardsModule struct {
	db          *gorm.DB
	usersModule *users.UsersModule
}

func NewCardsModule(db *gorm.DB, usersModule *users.UsersModule) *CardsModule {
	return &CardsModule{db, usersModule}
}

// func (m *CardsModule) GetAllCardsByWorkspaceID(ctx echo.Context, userID uint, workspaceID uint) ([]*models.ApiCard, *echo.HTTPError) {
// 	var user models.User
// 	if m.db.Limit(20).Preload("Cards").Find(&user, userID).Error != nil {
// 		return nil, echo.ErrInternalServerError
// 	}

// 	cards := []*models.ApiCard{}
// 	for _, w := range user.Cards {
// 		if w == nil {
// 			ctx.Logger().Warn("nil card for " + fmt.Sprint(userID))
// 			continue
// 		}

// 		cards = append(cards, &models.ApiCard{
// 			ID:          w.ID,
// 			Name:        w.Name,
// 			Description: w.Description,
// 			AmIOwner:    w.OwnerID == userID,
// 			AmIMember:   true,
// 		})
// 	}
// 	return cards, nil
// }

func (m *CardsModule) GetCardByID(ctx echo.Context, userID uint, cardID uint) (*models.ApiCard, *echo.HTTPError) {
	var card *models.Card
	if err := m.db.Preload("Cards").First(&card, cardID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, echo.ErrNotFound
		}
		ctx.Logger().Debug("load card err", err)
		return nil, echo.ErrInternalServerError
	}

	//todo: check if the user is a member of workspace

	return &models.ApiCard{
		ID:          card.ID,
		Title:       card.Title,
		Description: card.Description,
		BoardID:     card.BoardID,
		CreatorID:   card.CreatorID,
		ListID:      card.ListID,
	}, nil
}

func (m *CardsModule) CreateCard(ctx echo.Context, data *models.ApiCard) (*models.ApiCard, *echo.HTTPError) {
	//todo: check if the user is a member of workspace
	// user, err := m.usersModule.GetUserByID(ctx, data.OwnerID)
	// if err != nil {
	// 	return nil, echo.NewHTTPError(http.StatusBadRequest, err)
	// }

	newCard := cardsUtils.MapApiCardToCard(data)
	if res := m.db.Create(&newCard); res.Error != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}
	return cardsUtils.MapCardToApiCard(newCard), nil
}

func (m *CardsModule) DeleteCard(ctx echo.Context, userID uint, cID uint) *echo.HTTPError {
	var card models.Card
	if res := m.db.Take(&card, cID); res.Error != nil {
		if errors.Is(res.Error, gorm.ErrRecordNotFound) {
			return echo.ErrNotFound
		}
		return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}

	//todo: check membership in workspace
	// if card.OwnerID != userID {
	// 	return echo.NewHTTPError(http.StatusForbidden, "your not card owner")
	// }

	if res := m.db.Delete(&models.Card{}, cID); res.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}
	return nil
}

func (m *CardsModule) ChangeCardTitle(ctx echo.Context, userID uint, cID uint, title string) *echo.HTTPError {
	var card models.Card
	if res := m.db.Take(&card, cID); res.Error != nil {
		if errors.Is(res.Error, gorm.ErrRecordNotFound) {
			return echo.ErrNotFound
		}
		return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}

	//todo: check membership in workspace

	card.Title = title
	if res := m.db.Model(&models.Card{}).Where("id = ?", card.ID).Updates(&card); res.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, res.Error.Error())
	}
	return nil
}
