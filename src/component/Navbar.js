import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [userData, setUserData] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false); // State for theme toggle
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

    // Authentication state and user data management
    useEffect(() => {
        const updateAuthState = () => {
            const token = localStorage.getItem("access_token");
            setIsAuthenticated(!!token);
            const storedRole = localStorage.getItem("user_role");
            setUserRole(storedRole || "");

            if (token) {
                axios.get("http://127.0.0.1:8000/api/users/me/", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then(response => {
                        setUserData(response.data);
                        setUserRole(response.data.role);
                    })
                    .catch(error => console.error("Error fetching user data:", error));
            }
        };

        updateAuthState();
        window.addEventListener("authChange", updateAuthState);

        return () => {
            window.removeEventListener("authChange", updateAuthState);
        };
    }, []);

    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_role");
        setIsAuthenticated(false);
        setUserRole("");
        setUserData(null);
        window.dispatchEvent(new Event("authChange"));
        setIsMenuOpen(false); // Close the menu
        history.push("/");
    };

    // Toggle theme (dark/light mode)
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.className = isDarkMode ? "" : "dark-mode"; // Apply class globally
    };

    // Toggle menu (open/close)
    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState); // Toggle menu visibility
    };

    // Close menu when navigating
    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className={`container-fluid sticky-top ${isDarkMode ? "bg-dark text-white" : "bg-white shadow-sm"}`}>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light py-3 py-lg-0">
                    <NavLink to="/" className="navbar-brand">
                        <h1 className={`m-0 text-uppercase Clinic fw-bold ${isDarkMode ? "text-white" : "text-dark"}`}>
                            <i className="fa fa-clinic-medical me-2"></i>Clinic tech
                        </h1>
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-controls="navbarNav"
                        aria-haspopup="true"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink
                                    exact
                                    to="/"
                                    className={`nav-item nav-link ${isDarkMode ? "text-white" : ""}`}
                                    activeClassName="active"
                                    onClick={handleMenuClose}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/about"
                                    className={`nav-item nav-link ${isDarkMode ? "text-white" : ""}`}
                                    activeClassName="active"
                                    onClick={handleMenuClose}
                                >
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/list-doctors"
                                    className={`nav-item nav-link ${isDarkMode ? "text-white" : ""}`}
                                    activeClassName="active"
                                    onClick={handleMenuClose}
                                >
                                    Doctors
                                </NavLink>
                            </li>
                            {/* Admin Link */}
                            <li className="nav-item" style={{ marginTop: '15px' }}>
                                <NavLink
                                    to="/admin/login"
                                    className="nav-link"
                                    style={({ isActive }) => ({
                                        backgroundColor: isActive ? '#000' : '#333',
                                        color: '#fff',
                                        padding: '10px 20px',
                                        borderRadius: '30px',
                                        fontWeight: 'bold',
                                        textDecoration: 'none',
                                        transition: '0.3s',
                                        margintop: '15px',
                                        boxShadow: isActive ? '0 4px 10px rgba(0,0,0,0.3)' : '',
                                    })}
                                >
                                    Admin
                                </NavLink>
                            </li>
                            {isAuthenticated ? (
                                <>
                                    {userRole === "doctor" && (
                                        <li className="nav-item">
                                            <NavLink
                                                to="/clinic"
                                                className={`nav-item nav-link ${isDarkMode ? "text-white" : ""}`}
                                                onClick={handleMenuClose}
                                            >
                                                My Appointments
                                            </NavLink>
                                        </li>
                                    )}
                                    {userRole === "patient" && (
                                        <li className="nav-item">
                                            <NavLink
                                                to="/patient-appointment"
                                                className={`nav-item nav-link ${isDarkMode ? "text-white" : ""}`}
                                                onClick={handleMenuClose}
                                            >
                                                My Appointments
                                            </NavLink>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${isDarkMode ? "text-white" : ""}`}
                                            to="/doctor-profile"
                                            onClick={handleMenuClose}
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className="nav-link text-danger"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${isDarkMode ? "text-white" : ""}`}
                                            to="/login"
                                            onClick={handleMenuClose}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${isDarkMode ? "text-white" : ""}`}
                                            to="/register"
                                            onClick={handleMenuClose}
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                        {/* Theme toggle button */}
                        <button
                            className={`btn btn-outline-secondary ms-2 ${isDarkMode ? "btn-light" : "btn-dark"}`}
                            onClick={toggleTheme}
                        >
                            {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
