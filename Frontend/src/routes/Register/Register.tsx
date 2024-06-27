import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { AppRoutes } from "../utils";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailValid(isValid);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const isMatch = value === confirmPassword;
    setPasswordMatch(isMatch);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    const isMatch = value === password;
    setPasswordMatch(isMatch);
  };

  //todo: fix any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!emailValid) {
      alert("Your email address is not valid!");
    } else if (!passwordMatch) {
      alert("Your passwords do not match!");
    } else if (password.length < 6) {
      alert("Your passwords is too short!");
    } else {
      alert("Your have successfuly signed up!");
      navigate("/login");
    }
  };

  const handleRedirect = () => {
    navigate(`/${AppRoutes.LOGIN}`);
  };

  return (
    <div className={styles.Container}>
      <h2 className={styles.Title}>Trello</h2>
      <h3 className={styles.SmallTitle}>Sign up to continue</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.FormGroup}>
          <input
            className={styles.Input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <input
            className={styles.Input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className={styles.Input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <input
            className={styles.Input}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {showPasswordError && (
            <div className={styles.Error} style={{ color: "red" }}>
              Passwords do not match!
            </div>
          )}
          {showEmailError && (
            <div className={styles.Error} style={{ color: "red" }}>
              Please enter a valid email address.
            </div>
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
  );
};
