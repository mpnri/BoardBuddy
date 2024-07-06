import { RootState } from "~/store";

export const userSelector = (state: RootState, id: number) =>
  state.users.users.get(id);
