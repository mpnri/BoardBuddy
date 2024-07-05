package utils

import "board-buddy/models"

func MapCardToApiCard(card models.Card) *models.ApiCard {
	return &models.ApiCard{
		ID:          card.ID,
		Title:       card.Title,
		Description: card.Description,
		BoardID:     card.BoardID,
		CreatorID:   card.CreatorID,
		ListID:      card.ListID,
	}
}

func MapCardsToApiCards(cards []models.Card) []*models.ApiCard {
	apiCards := []*models.ApiCard{}
	for _, b := range cards {
		apiCards = append(apiCards, MapCardToApiCard(b))
	}
	return apiCards
}

func MapApiCardToCard(card *models.ApiCard) models.Card {
	return models.Card{
		Title:       card.Title,
		Description: card.Description,
		BoardID:     card.BoardID,
		CreatorID:   card.CreatorID,
		ListID:      card.ListID,
	}
}

func MapApiCardsToCards(cards []*models.ApiCard) []models.Card {
	apiCards := []models.Card{}
	for _, b := range cards {
		apiCards = append(apiCards, MapApiCardToCard(b))
	}
	return apiCards
}
