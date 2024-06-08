import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./Register/Register";
import { Login } from "./Login/Login";

const routes = createBrowserRouter([
  //todo: Root element
  { path: "/", element: <div>Hello world</div> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);

export const MainRoutes: React.FC = () => {
  return <RouterProvider router={routes} />;
};
