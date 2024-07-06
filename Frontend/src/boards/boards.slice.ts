import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiBoard } from "../types/board";

export interface BoardsStore {
  boards: Map<number, ApiBoard>;
}

const initialState: BoardsStore = {  
  boards: new Map(),
};

const BoardsSlice = createSlice({
  name: "Boards",
  initialState,
  reducers: {
    setBoards(state, action: PayloadAction<ApiBoard[]>) {
      action.payload.forEach((board) =>
        state.boards.set(board.id, board)
      );
    },
  },
});

export const BoardsActions = BoardsSlice.actions;
export const BoardsReducers = BoardsSlice.reducer;
