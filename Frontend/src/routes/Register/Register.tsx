import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { AppRoutes } from "../utils";
import { AuthAPI } from "../../auth/auth.api";
import { useAppDispatch, useAppSelector } from "../../utils/hooks.store";
import { AuthActions } from "../../auth/auth.slice";
import { UsersActions } from "../../users/users.slice";
import { authStateSelector } from "../../auth/auth.selector";
import { AuthState } from "../../auth/auth.utils";

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector(authStateSelector);
  useEffect(() => {
    if (authState === AuthState.Success) {
      navigate(AppRoutes.Home);
    }
  }, [authState]);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);
  const [showPassMatchError, setShowPassMatchError] = useState(false);
  const [showPassError, setShowPassError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (isValid) {
      event.target.setCustomValidity("");
      setShowEmailError(false);

    }
    setEmailValid(isValid);
  };

  const handleEmailError = (event: React.InvalidEvent<HTMLInputElement>) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value);
    if (!isValid) {
      setShowEmailError(true);
      event.target.setCustomValidity(" ");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    const isMatch = password === confirmPassword;
    setPasswordMatch(isMatch);

    if (password.length === 0) {
      // setShowPassMatchError(true);
      setShowPassError(true);
      e.target.setCustomValidity(" ");
    } else if (!isMatch) {
      setShowPassMatchError(true);
      setShowPassError(false);
      e.target.setCustomValidity("");
    } else {
      setShowPassMatchError(false);
      e.target.setCustomValidity("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPass = e.target.value;
    setConfirmPassword(confirmPass);
    const isMatch = confirmPass === password;
    setPasswordMatch(isMatch);

    if (password.length>0 && !isMatch) {
      setShowPassMatchError(true);
      e.target.setCustomValidity(" ");
    } else {
      setShowPassMatchError(false);
      e.target.setCustomValidity("");
    }
  };

  const handleUsernameError = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity(" ");
    setShowUserError(true);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUsername(username);

    if (username.length > 0) {
      setUsername(username);
      setShowUserError(false);
      e.target.setCustomValidity("");
    }
  };

  //todo: fix any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    AuthAPI.registerUser({ username, email, password })
      .then((user) => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          dispatch(AuthActions.setAuthenticatedUser(user));
          dispatch(UsersActions.setUsers([user]));
          navigate(AppRoutes.Workspace);
        }, 1500);
      })
      .catch(() => {});
  };

  const handleRedirect = () => {
    navigate(AppRoutes.LOGIN);
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.LeftContainer}></div>
      <div className={styles.Container}>
        <div className={styles.ImageContainer}>
          <img src="./src/assets/trello.png" alt="trello icon" />
          <h2 className={styles.Title}>Trello</h2>
        </div>
        <h3 className={styles.SmallTitle}>Sign up to continue</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.FormGroup}>
            <input
              className={`${styles.Input} ${!emailValid && showEmailError ? styles.InputError : ""}`}
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              onInvalid={handleEmailError}
              required
            />
            {showEmailError && !emailValid && (
              <p className={styles.EmailError}>{"Your email is invalid!"}</p>
            )}
            <input
              className={styles.Input}
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUserChange}
              onInvalid={handleUsernameError}
              required
            />
            {showUserError && (
              <p className={styles.EmailError}>{"Enter your username!"}</p>
            )}
            <input
              className={styles.Input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              onInvalid={handlePasswordChange}
              required
            />
            {showPassError && (
              <p className={styles.EmailError}>{"Enter your password!"}</p>
            )}
            <input
              className={styles.Input}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onInvalid={handleConfirmPasswordChange}
              required
            />
            {showPassMatchError && (
              <p className={styles.EmailError}>
                {"Your passwords don't match!"}
              </p>
            )}
            {showSuccessMessage && (
              <p className={styles.Success}>
                {"You have successfuly signed up!"}
              </p>
            )}
          </div>
          <button type="submit">Sign Up</button>
          <button
            className={styles.BackToLoginButton}
            type="button"
            onClick={handleRedirect}
          >
            Already have an account? Log in
          </button>
        </form>
      </div>
      <div className={styles.RightContainer}></div>
    </div>
  );
};
