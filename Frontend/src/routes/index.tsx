import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./Register/Register";
import { Login } from "./Login/Login";
import { AppRoutes } from "./utils";
import { Home } from "./Home/Home";

const routes = createBrowserRouter([
  //todo: Root element
  { path: "/", element: <Home /> },
  { path: `/${AppRoutes.REGISTER}`, element: <Register /> },
  { path: `/${AppRoutes.LOGIN}`, element: <Login /> },
]);

export const MainRoutes: React.FC = () => {
  return <RouterProvider router={routes} />;
};
