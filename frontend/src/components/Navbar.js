import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate()
  const checkLogInStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLogInStatus();
  }, [isLoggedIn]);

  const logOut = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('usrId')
    useNavigate("/")
  } 
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Event Management
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Events</Link>
          </li>
          
          {isLoggedIn ? (
            <>
            <li className="nav-item">
            <Link to="/create" className="nav-links">Create Event</Link>
          </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-links">Dashboard</Link>
              </li>
              <li className="nav-item">
                {/* Add a logout link here if needed */}
                <Link onClick={logOut} className="nav-links">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-links">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;