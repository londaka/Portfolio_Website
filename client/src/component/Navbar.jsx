import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Initialize useLocation
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔹 Function to check authentication status
  const checkAuth = () => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  };

  // 🔹 Logout handler
  const handleLogout = async () => {
    try {
      // Optional backend call
      await axios.post("http://localhost:8000/auth/user/logout");

      // Remove token and redirect
      localStorage.removeItem("authToken");
      setIsLoggedIn(false); // Update state immediately after logout
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    // Initial check when the component mounts
    checkAuth();

    // Listen for storage changes across tabs/windows
    window.addEventListener("storage", checkAuth);

    // Clean up the event listener
    return () => window.removeEventListener("storage", checkAuth);
  }, []); // Empty dependency array means this runs once on mount and unmount

  // 🔹 Effect to re-check auth status when the route changes (e.g., after login redirect)
  useEffect(() => {
    checkAuth();
  }, [location.pathname]); // Re-run checkAuth when the URL path changes

  return (
    <nav className="flex justify-between items-center border text-white bg-gray-900  shadow-md fixed left-0 right-0 top-0 z-50 h-16 px-6">
      {/* Logo */}
      <Link to="/home" className="sm:text-sm sm:font-semibold font-extrabold text-xl">
        My Website
      </Link>

      {/* Navigation Links */}
      <ul className="flex items-center gap-8">
        <li className="hover:underline">
          <NavLink to="/home" end>
            Home
          </NavLink>
        </li>
        <li className="hover:underline">
          <NavLink to="/about">About</NavLink>
        </li>
        <li className="hover:underline">
          <NavLink to="/project">Project</NavLink>
        </li>
        <li className="hover:underline">
          <NavLink to="/contact">Contact</NavLink>
        </li>

        {/* 🔒 Auth Buttons */}
        {!isLoggedIn ? (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-orange-600 text-white shadow-md"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`
                }
              >
                Signup
              </NavLink>
            </li>
          </>
        ) : (
          // ⚙️ Settings Dropdown
          <li className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="bg-gray-700 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-600 transition-all flex items-center gap-2"
            >
              ⚙️ Settings
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg py-2">
                <button
                  onClick={handleLogout}
                  className="block cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;