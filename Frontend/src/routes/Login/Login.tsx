import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../utils";
import styles from "./Login.module.scss";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUpRedirect = () => {
    navigate("/" + AppRoutes.REGISTER);
  };

  //todo: implement
  const handleSubmit = (event: any) => {
    // event.preventDefault();
    // setError("");
    // try {
    //   const response = await axios.post(
    //     "https://api.trello.com/1/authenticate",
    //     {
    //       username,
    //       password,
    //     }
    //   );
    //   // Assuming the response contains a token
    //   const { token } = response.data;
    //   // Save the token (consider using more secure storage in a real app)
    //   localStorage.setItem("trelloToken", token);
    //   // Redirect to the main app page
    //   // history.push('/dashboard');
    // } catch (error) {
    //   setError("Invalid login credentials. Please try again.");
    // }
  };

  return (
    <div className={styles.Container}>
      <h2 className={styles.Title}>Trello</h2>
      <h3 className={styles.SmallTitle}>Login to continue</h3>
      {/* todo: refactor to div */}
      <form onSubmit={handleSubmit}>
        <div className={styles.FormGroup}>
          {/* <label className={styles.Label}>Email:</label> */}
          <input
          className={styles.Input}
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.FormGroup}>
          {/* <label className={styles.Label}>Password:</label> */}
          <input
            className={styles.Input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.Error}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <div className={styles.CantLogin}>
        <label>Can't log in?</label>
        <button onClick={handleSignUpRedirect}>Create an account</button>
      </div>
    </div>
  );
};
