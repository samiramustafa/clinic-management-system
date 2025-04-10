import React, { useState, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom"; // Combined imports
import "bootstrap/dist/css/bootstrap.min.css";
// Consider importing Bootstrap Icons or Font Awesome if not already globally available
// import 'bootstrap-icons/font/bootstrap-icons.css';
// Make sure Font Awesome CSS is linked in your public/index.html or imported if using npm package
import axios from "axios";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [userData, setUserData] = useState(null); // Keep for potential future use (e.g., display name)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Optional: Persist theme preference
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            document.body.className = savedTheme === "dark" ? "dark-mode" : "";
            return savedTheme === "dark";
        }
        return false; // Default to light
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const history = useHistory();

    // Authentication and User Data Effect
    useEffect(() => {
        const updateAuthState = () => {
            const token = localStorage.getItem("access_token");
            const storedRole = localStorage.getItem("user_role"); // Get role from storage first for quicker UI update
            setIsAuthenticated(!!token);
            setUserRole(storedRole || ""); // Use stored role initially

            if (token && !userData) { // Fetch user data only if token exists and data is not already fetched
                axios.get("http://127.0.0.1:8000/api/users/me/", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then(response => {
                        setUserData(response.data);
                        // Update role from API response for accuracy, might overwrite localStorage version
                        setUserRole(response.data.role);
                        // Optional: Update localStorage role if needed
                        // localStorage.setItem("user_role", response.data.role);
                    })
                    .catch(error => {
                        console.error("Error fetching user data:", error);
                         // Handle potential 401 Unauthorized (e.g., expired token)
                         if (error.response?.status === 401) {
                            handleLogout(); // Log out if token is invalid
                         }
                    });
            } else if (!token) {
                setUserData(null); // Clear user data if no token
            }
        };

        updateAuthState();
        window.addEventListener("authChange", updateAuthState);

        return () => {
            window.removeEventListener("authChange", updateAuthState);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]); // Rerun when auth state potentially changes

    // Theme Toggle Effect
     useEffect(() => {
        document.body.className = isDarkMode ? "dark-mode" : ""; // Apply class globally
        // Optional: Persist theme preference
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);


    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_role");
        // Also remove theme preference if desired on logout
        // localStorage.removeItem("theme");
        setIsAuthenticated(false);
        setUserRole("");
        setUserData(null);
        setIsMenuOpen(false); // Close menu
        // Dispatch custom event instead of relying on state change sometimes causing delays
        window.dispatchEvent(new Event("authChange"));
        history.push("/"); // Redirect to home
    };

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const handleMenuClose = () => {
        // Only close if the menu is currently open (useful for wider screens)
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    // Define active style for NavLink (optional, Bootstrap's default might be fine)
    const activeStyle = {
        // Example: fontWeight: "bold",
        // borderBottom: isDarkMode ? "2px solid white" : "2px solid blue",
    };

    return (
        // Use data-bs-theme for Bootstrap component adaptation in dark mode
        <div className={`container-fluid sticky-top shadow-sm ${isDarkMode ? "bg-dark" : "bg-light"}`} data-bs-theme={isDarkMode ? "dark" : "light"}>
            <div className="container">
                 {/* Adjusted padding, ensure navbar-expand-lg works */}
                <nav className="navbar navbar-expand-lg py-2">
                    {/* Brand */}
                    <NavLink to="/" className="navbar-brand me-auto" onClick={handleMenuClose}>
                        <h1 className={`m-0 text-uppercase fw-bold ${isDarkMode ? "text-white" : "text-primary"}`}>
                            <i className="fa fa-clinic-medical me-2"></i>Clinic tech
                        </h1>
                    </NavLink>

                    {/* Toggler */}
                    <button
                        className={`navbar-toggler ${isMenuOpen ? "" : "collapsed"}`} // Show state visually
                        type="button"
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-controls="navbarNavContent"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Content */}
                    <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNavContent">
                        {/* Use ms-auto to push nav items to the right */}
                        <ul className="navbar-nav ms-auto align-items-lg-center"> {/* Align items center on large screens */}
                            {/* Standard Links */}
                            <li className="nav-item">
                                <NavLink exact to="/" className="nav-link px-3 py-2" activeClassName="active" onClick={handleMenuClose} > Home </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link px-3 py-2" activeClassName="active" onClick={handleMenuClose} > About </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/list-doctors" className="nav-link px-3 py-2" activeClassName="active" onClick={handleMenuClose} > Doctors </NavLink>
                            </li>

                            {isAuthenticated ? (
                                <>
                                    {userRole === "doctor" && (
                                        <>
                                            <li className="nav-item">
                                                <NavLink to="/clinic" className="nav-link px-3 py-2" activeClassName="active" onClick={handleMenuClose}> Available Times </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/appointmentstatus" className="nav-link px-3 py-2" activeClassName="active" onClick={handleMenuClose}> My Appointments </NavLink>
                                            </li>
                                        </>
                                    )}
                                    {userRole === "patient" && (
                                        <li className="nav-item">
                                            <NavLink to="/patient-appointment" className="nav-link px-3 py-2" activeClassName="active" onClick={handleMenuClose}> My Appointments </NavLink>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <Link className="nav-link px-3 py-2" to="/doctor-profile" onClick={handleMenuClose}>
                                            <i className="fas fa-user me-1"></i> Profile {/* Added Icon */}
                                        </Link>
                                    </li>
                                    <li className="nav-item d-none d-lg-block mx-lg-1"></li>
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-outline-danger btn-sm my-2 my-lg-0 ms-lg-2"
                                            onClick={handleLogout} 
                                        >
                                            <i className="fas fa-sign-out-alt me-1"></i> Logout {/* Added Icon */}
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                  
                                    <li className="nav-item d-none d-lg-block mx-lg-1"></li>
                                    <li className="nav-item">
                                        <Link className="btn btn-outline-primary btn-sm my-2 my-lg-0" to="/login" onClick={handleMenuClose}> Login </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-primary btn-sm my-2 my-lg-0 ms-lg-2" to="/register" onClick={handleMenuClose}> Register </Link>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <NavLink
                                    to="/admin/login"
                                    className="btn btn-outline-secondary btn-sm my-2 my-lg-0 ms-lg-3" // Consistent button styling
                                    onClick={handleMenuClose}
                                >
                                     <i className="fas fa-user-shield me-1"></i> Admin {/* Added Icon */}
                                </NavLink>
                            </li>

                            <li className="nav-item ms-lg-3">
                                <button
                                    className="btn btn-secondary btn-sm my-2 my-lg-0"
                                    onClick={toggleTheme}
                                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                                >
                                    {isDarkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;