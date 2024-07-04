import React from "react";
import { MainRoutes } from "./routes";
//todo: use sass
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  //todo: add Toast and breakpoint `providers`
  return <MainRoutes />;
};

export default App;
