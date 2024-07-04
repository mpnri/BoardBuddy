import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./Register/Register";
import { Login } from "./Login/Login";
import { AppRoutes } from "./utils";
import { Home } from "./Home/Home";
import { UsersAPI } from "../users/users.api";
import { useAppDispatch } from "../utils/hooks.store";
import { AuthActions } from "../auth/auth.slice";
import { UsersActions } from "../users/users.slice";
import { ReasonPhrases } from "http-status-codes";

const routes = createBrowserRouter([
  { path: AppRoutes.Home, element: <Home /> },
  { path: AppRoutes.REGISTER, element: <Register /> },
  { path: AppRoutes.LOGIN, element: <Login /> },
]);

export const MainRoutes: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(AuthActions.setTokenChecking());
    UsersAPI.getMe({})
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
