import { configureStore } from "@reduxjs/toolkit";
import { AuthReducers } from "./auth/auth.slice";
import { UsersReducers } from "./users/users.slice";
import { enableMapSet } from "immer";
import { WorkspacesReducers } from "./workspaces/workspaces.slice";
import { ListsReducers } from "./lists/lists.slice";
import { BoardsReducers } from "./boards/boards.slice";
enableMapSet();

export const store = configureStore({
  reducer: {
    users: UsersReducers,
    auth: AuthReducers,
    workspaces: WorkspacesReducers,
    boards: BoardsReducers,
    lists: ListsReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
