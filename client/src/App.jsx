import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import Navbar from './component/Navbar';
import Home from './component/Hero';
import About from './pages/About';
import Project from './pages/Project';
import Contact from './pages/Contact';
import SignupForm from './pages/Signup';
import LoginForm from './pages/Login';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const publicPaths = ['/login', '/signup', '/']; // Paths accessible without login

    // If there's an auth token, and the user is on a public path,
    // redirect them to home. This prevents logged-in users from seeing login/signup again.
    if (authToken && publicPaths.includes(location.pathname)) {
      navigate('/home');
    }
    // If there's NO auth token, and the user is trying to access a protected route
    // (which PrivateRoute will handle by redirecting to /login)
    // OR if they are on the root path '/', redirect them to '/login'
    else if (!authToken && location.pathname === '/') {
      navigate('/login');
    }
    // Otherwise, do nothing. Let the user stay on the current path
    // if it's a public path like /login or /signup, or let PrivateRoute handle
    // redirection if it's a protected path without a token.

  }, [navigate, location.pathname]); // Depend on location.pathname to re-run on path changes

  return (
    <>
      <Navbar />
      <Routes>
        {/*
          Root Path: Now, if a user directly hits '/', the useEffect will redirect them to /login
          if not authenticated, or /home if authenticated.
          This route itself doesn't strictly need an element if the useEffect handles it,
          but you can keep it as a fallback or for consistency.
        */}
        <Route path='/' element={<LoginForm />} /> {/* Default entry for unauthenticated */}


        {/* Public Routes - These are always accessible */}
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />

        {/* Protected Routes - Accessible only if authenticated */}
        <Route
          path='/home'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='/about'
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path='/project'
          element={
            <PrivateRoute>
              <Project />
            </PrivateRoute>
          }
        />
        <Route
          path='/contact'
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;