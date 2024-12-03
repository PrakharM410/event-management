import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Check if token exists and is valid
  const isTokenValid = () => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      // Check if the token has expired
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  };

  return isTokenValid() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
