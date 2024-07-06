package utils

import "board-buddy/models"

func MapListToApiList(list models.List) *models.ApiList {
	return &models.ApiList{
		ID:      list.ID,
		Title:   list.Title,
		BoardID: list.BoardID,
		Order:   list.Order,
	}
}

func MapListsToApiLists(lists []models.List) []*models.ApiList {
	apiLists := []*models.ApiList{}
	for _, b := range lists {
		apiLists = append(apiLists, MapListToApiList(b))
	}
	return apiLists
}

func MapApiListToList(list *models.ApiList) models.List {
	return models.List{
		Title:   list.Title,
		BoardID: list.BoardID,
		Order:   list.Order,
	}
}

func MapApiListsToLists(lists []*models.ApiList) []models.List {
	apiLists := []models.List{}
	for _, b := range lists {
		apiLists = append(apiLists, MapApiListToList(b))
	}
	return apiLists
}
