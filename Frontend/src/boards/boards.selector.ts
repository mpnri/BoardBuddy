import { RootState } from "~/store";

export const boardsSelector = (state: RootState) => state.boards.boards;

export const boardSelector = (state: RootState, id: number) =>
  state.boards.boards.get(id);
