import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiUser } from "../types/users";
import { AuthState } from "./auth.utils";

export interface AuthStore {
  state: AuthState;
  myID: number;
}

const initialState: AuthStore = {
  state: AuthState.Initial,
  myID: 0,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuthenticatedUser(state, action: PayloadAction<ApiUser>) {
      state.myID = action.payload.id;
      state.state = AuthState.Success;
    },
    setUnAuthorized(state) {
      state.myID = 0;
      state.state = AuthState.UnAuthorized;
    },
    setTokenChecking(state) {
      state.state = AuthState.TokenChecking;
    },
  },
});

export const AuthActions = AuthSlice.actions;
export const AuthReducers = AuthSlice.reducer;
