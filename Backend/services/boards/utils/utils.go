package utils

import "board-buddy/models"

func MapBoardToApiBoard(board models.Board) *models.ApiBoard {
	return &models.ApiBoard{
		ID:          board.ID,
		Name:        board.Name,
		WorkspaceID: board.WorkspaceID,
	}
}

func MapBoardsToApiBoards(boards []models.Board) []*models.ApiBoard {
	apiBoards := []*models.ApiBoard{}
	for _, b := range boards {
		apiBoards = append(apiBoards, MapBoardToApiBoard(b))
	}
	return apiBoards
}
