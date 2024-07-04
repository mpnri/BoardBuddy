import { RootState } from "../store";

export const authStateSelector = (state: RootState) => state.auth.state;
export const myIDSelector = (state: RootState) => state.auth.myID;
