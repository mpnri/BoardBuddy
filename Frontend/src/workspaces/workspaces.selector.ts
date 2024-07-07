import { RootState } from "~/store";

export const workspacesSelector = (state: RootState) =>
  state.workspaces.workspaces;

export const workspaceSelector = (state: RootState, id: number) =>
  state.workspaces.workspaces.get(id);
