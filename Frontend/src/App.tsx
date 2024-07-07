import React from "react";
import { MainRoutes } from "./routes";
//todo: use sass
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-spring-bottom-sheet/dist/style.css";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from "react-toastify";

const App: React.FC = () => {
  //todo: add Toast and breakpoint `providers`
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <MainRoutes />
    </>
  );
};

export default App;
