import { configureStore } from "@reduxjs/toolkit";
import { AuthReducers } from "./auth/auth.slice";
import { UsersReducers } from "./users/users.slice";
import { enableMapSet } from "immer";
import { WorkspacesReducers } from "./workspaces/workspaces.slice";
enableMapSet();

export const store = configureStore({
  reducer: {
    users: UsersReducers,
    auth: AuthReducers,
    workspaces: WorkspacesReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
