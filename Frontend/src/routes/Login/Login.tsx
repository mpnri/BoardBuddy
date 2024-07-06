import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../utils";
import styles from "./Login.module.scss";
import { useAppDispatch, useAppSelector } from "../../utils/hooks.store";
import { authStateSelector } from "../../auth/auth.selector";
import { AuthState } from "../../auth/auth.utils";
import { AuthAPI } from "../../auth/auth.api";
import { AuthActions } from "../../auth/auth.slice";
import { UsersActions } from "../../users/users.slice";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector(authStateSelector);
  useEffect(() => {
    if (authState === AuthState.Success) {
      navigate(AppRoutes.Workspace);
    }
  }, [authState]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPassError, setShowPassError] = useState(false);

  const handleSignUpRedirect = () => {
    navigate(AppRoutes.REGISTER);
  };

  const handleEmailError = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity(" ");
    setShowEmailError(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    setEmail(email);
    if (isValid) {
      setShowEmailError(false);
      e.target.setCustomValidity("");
    }else{
      setShowEmailError(true);
      e.target.setCustomValidity(" ");
    }
  };

  const handlePasswordError = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity(" ");
    setShowPassError(true);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    if (password.length > 0) {
      setShowPassError(false);
      e.target.setCustomValidity("");
    }else{
      setShowPassError(true);
      e.target.setCustomValidity(" ");
    }
  };

  //todo: implement
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setError("");
    AuthAPI.loginUser({ email, password })
      .then((user) => {
        setTimeout(() => {
          dispatch(AuthActions.setAuthenticatedUser(user));
          dispatch(UsersActions.setUsers([user]));
          navigate(AppRoutes.Home);
        }, 500);
      })
      .catch(() => {});
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.LeftContainer}></div>
      <div className={styles.Container}>
        <div className={styles.ImageContainer}>
          <img src="./src/assets/trello.png" alt="trello icon" />
          <h2 className={styles.Title}>Trello</h2>
        </div>

        <h3 className={styles.SmallTitle}>Login to continue</h3>
        {/* todo: refactor to div */}
        <form onSubmit={handleSubmit}>
          <div className={styles.FormGroup}>
            {/* <label className={styles.Label}>Email:</label> */}
            <input
              className={styles.Input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              onInvalid={handleEmailError}
              required
            />
            {showEmailError && (
              <p className={styles.EmailError}>{"Enter your email!"}</p>
            )}
          </div>
          <div className={styles.FormGroup}>
            {/* <label className={styles.Label}>Password:</label> */}
            <input
              className={styles.Input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              onInvalid={handlePasswordError}
              required
            />
            {showPassError && (
              <p className={styles.EmailError}>{"Enter your password!"}</p>
            )}
          </div>
          {error && <p className={styles.Error}>{error}</p>}
          <button className={styles.SubmitButton} type="submit">
            Login
          </button>
        </form>
        <div className={styles.CantLogin}>
          <label>Cant log in?</label>
          <button onClick={handleSignUpRedirect}>Create an account</button>
        </div>
      </div>
      <div className={styles.RightContainer}></div>
    </div>
  );
};
