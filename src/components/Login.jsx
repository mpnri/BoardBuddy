import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correct import for v6
import './Login.css'; // Optional: For styling

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://api.trello.com/1/authenticate', {
        username,
        password
      });
      
      // Assuming the response contains a token
      const { token } = response.data;
      
      // Save the token (consider using more secure storage in a real app)
      localStorage.setItem('trelloToken', token);
      
      // Redirect to the main app page
      // history.push('/dashboard');
    } catch (error) {
      setError('Invalid login credentials. Please try again.');
    }
  };

  return (
    <body>
      <div className="login-container">
      <h2>Trello</h2>
      <h3>Login to continue</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* <label>Email:</label> */}
          <input
            type="username"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          {/* <label>Password:</label> */}
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <div id='cant_login'>
      <label >Can't log in?</label>
      <button onClick={handleSignupRedirect}>Create an account</button>
      </div>
    </div>  
    </body>
   
  );
};

export default LoginPage;
