import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // ✅ must match the key used in your LoginForm
  const token = localStorage.getItem('authToken'); 

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
