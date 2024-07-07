import { RootState } from "~/store";

export const listsSelector = (state: RootState) => state.lists.lists;

export const listSelector = (state: RootState, id: number) =>
  state.lists.lists.get(id);
