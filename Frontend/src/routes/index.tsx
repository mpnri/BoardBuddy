import React, { useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./Register/Register";
import { Login } from "./Login/Login";
import { AppRoutes } from "./utils";
import { Home } from "./Home/Home";
import { useAppDispatch } from "../utils/hooks.store";
import { AuthActions } from "../auth/auth.slice";
import { UsersActions } from "../users/users.slice";
import { ReasonPhrases } from "http-status-codes";
import { AuthAPI } from "../auth/auth.api";
import Workspace from "./Home/WorkspaceBoard/MainBoard";
import { getBoardRoute } from "./Board/Board";

export const MainRoutes: React.FC = () => {
  const dispatch = useAppDispatch();

  const routes = useMemo(
    () =>
      createBrowserRouter([
        { path: AppRoutes.Home + "*", element: <Home /> },
        { path: AppRoutes.REGISTER + "/*", element: <Register /> },
        { path: AppRoutes.LOGIN + "/*", element: <Login /> },
        {
          path: AppRoutes.Workspace + "/*",
          element: <Workspace />,
          children: [getBoardRoute(dispatch)],
        },
      ]),
    []
  );

  useEffect(() => {
    dispatch(AuthActions.setTokenChecking());
    AuthAPI.getMe({})
      .then((user) => {
        dispatch(AuthActions.setAuthenticatedUser(user));
        dispatch(UsersActions.setUsers([user]));
      })
      .catch((err) => {
        if (typeof err === "string") {
          if (
            [ReasonPhrases.FORBIDDEN, ReasonPhrases.UNAUTHORIZED].includes(
              err as ReasonPhrases
            )
          ) {
            dispatch(AuthActions.setUnAuthorized());
          } else {
            console.log(err);
          }
        } else {
          console.log(err);
        }
      });
  }, []);

  return <RouterProvider router={routes} />;
};
