import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Optional: For styling

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailValid(isValid);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const isMatch = value === confirmPassword;
    setPasswordMatch(isMatch);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    const isMatch = value === password;
    setPasswordMatch(isMatch);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailValid){
      alert('Your email address is not valid!')
    }else if(!passwordMatch){
      alert('Your passwords do not match!')
    }else if(password.length<6){
      alert('Your passwords is too short!')
    } 
    else{
      alert('Your have successfuly signed up!','green')
      navigate('/login')
    }
  };

  const handleRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <h2>Trello</h2>
      <h3>Sign up to continue</h3>
      <form onSubmit={handleSubmit}>
        <div className="signup-form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {showPasswordError && (
            <div className="error" style={{ color: 'red' }}>
              Passwords do not match!
            </div>
          )}
          {showEmailError && (
            <div className="error" style={{ color: 'red' }}>
              Please enter a valid email address.
            </div>
          )}
        </div>
        <button type="submit">
          Sign Up
        </button>
        <button id="back_to_login" type="button" onClick={handleRedirect}>
          Already have an account? Log in
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
