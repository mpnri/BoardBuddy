import { Dispatch } from "@reduxjs/toolkit";
import { useOutletContext } from "react-router-dom";

export enum AppRoutes {
  Home = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  Workspace = "/workspace",
}

export interface RouterContext {
  dispatch: Dispatch;
}

export function useRouterContext() {
  return useOutletContext<RouterContext>();
}
