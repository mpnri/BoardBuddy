import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiUser } from "../types/users";

export interface UsersStore {
  users: Map<number, ApiUser>;
}

const initialState: UsersStore = {
  //todo: immutable?
  users: new Map(),
};

const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<ApiUser[]>) {
      action.payload.forEach((user) => state.users.set(user.id, user));
    },
  },
});

export const UsersActions = UsersSlice.actions;
export const UsersReducers = UsersSlice.reducer;
