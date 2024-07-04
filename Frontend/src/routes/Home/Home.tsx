import React, { useEffect } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import { useAppSelector } from "../../utils/hooks.store";
import { authStateSelector } from "../../auth/auth.selector";
import { AuthState } from "../../auth/auth.utils";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../utils";
import { Spinner } from "react-bootstrap";

//todo: implement main home page UI
export const Home: React.FC = () => {
  const navigate = useNavigate();
  const authState = useAppSelector(authStateSelector);

  useEffect(() => {
    if (authState === AuthState.UnAuthorized || authState === AuthState.Error) {
      navigate(AppRoutes.LOGIN);
    }
  }, [authState]);

  if (authState === AuthState.TokenChecking) {
    return <Spinner />
  }

  return (
    <>
      {
        // todo: Header or Navbar
        // todo: main component base on router
      }
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};
