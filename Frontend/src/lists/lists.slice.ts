import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiList } from "../types/list";

export interface ListsStore {
  lists: Map<number, ApiList>;
}

const initialState: ListsStore = {  
  lists: new Map(),
};

const ListsSlice = createSlice({
  name: "Lists",
  initialState,
  reducers: {
    setLists(state, action: PayloadAction<ApiList[]>) {
      action.payload.forEach((list) =>
        state.lists.set(list.id, list)
      );
    },
  },
});

export const ListsActions = ListsSlice.actions;
export const ListsReducers = ListsSlice.reducer;
