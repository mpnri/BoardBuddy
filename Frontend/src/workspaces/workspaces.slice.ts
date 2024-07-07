import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiWorkspace } from "../types/workspace";

export interface WorkspacesStore {
  workspaces: Map<number, ApiWorkspace>;
}

const initialState: WorkspacesStore = {
  workspaces: new Map(),
};

const WorkspacesSlice = createSlice({
  name: "Workspaces",
  initialState,
  reducers: {
    setWorkspaces(state, action: PayloadAction<ApiWorkspace[]>) {
      action.payload.forEach((workspace) =>
        state.workspaces.set(workspace.id, workspace)
      );
    },
  },
});

export const WorkspacesActions = WorkspacesSlice.actions;
export const WorkspacesReducers = WorkspacesSlice.reducer;
