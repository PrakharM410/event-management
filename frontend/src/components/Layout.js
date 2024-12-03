import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Correct import for useNavigate
import './Login.css';  // Importing the CSS for Login component

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // useNavigate for navigation

  const handleLogin = () => {
    // Perform login logic (for now, we assume login is successful)
    alert('Logged in successfully');
    navigate('/home');  // Redirect to home page after login
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="textbox">
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="textbox">
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="button" className="login-btn" onClick={handleLogin}>Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: '#3498db' }}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}
