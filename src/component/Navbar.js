// import React, { useState, useEffect } from "react";
// import { Link, NavLink } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// const Navbar = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [userRole, setUserRole] = useState("");
//     const [userData, setUserData] = useState(null);
//     const [isDarkMode, setIsDarkMode] = useState(false); // State for theme toggle
//     const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

//     // Authentication state and user data management
//     useEffect(() => {
//         const updateAuthState = () => {
//             const token = localStorage.getItem("access_token");
//             setIsAuthenticated(!!token);
//             const storedRole = localStorage.getItem("user_role");
//             setUserRole(storedRole || "");

//             if (token) {
//                 axios.get("http://127.0.0.1:8000/api/users/me/", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 })
//                     .then(response => {
//                         setUserData(response.data);
//                         setUserRole(response.data.role);
//                     })
//                     .catch(error => console.error("Error fetching user data:", error));
//             }
//         };

//         updateAuthState();
//         window.addEventListener("authChange", updateAuthState);

//         return () => {
//             window.removeEventListener("authChange", updateAuthState);
//         };
//     }, []);

//     const history = useHistory();

//     const handleLogout = () => {
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("user_role");
//         setIsAuthenticated(false);
//         setUserRole("");
//         setUserData(null);
//         window.dispatchEvent(new Event("authChange"));
//         setIsMenuOpen(false); // Close the menu
//         history.push("/");
//     };

//     // Toggle theme (dark/light mode)
//     const toggleTheme = () => {
//         setIsDarkMode(!isDarkMode);
//         document.body.className = isDarkMode ? "" : "dark-mode"; // Apply class globally
//     };

//     // Toggle menu (open/close)
//     const toggleMenu = () => {
//         setIsMenuOpen((prevState) => !prevState); // Toggle menu visibility
//     };

//     // Close menu when navigating
//     const handleMenuClose = () => {
//         setIsMenuOpen(false);
//     };

//     return (
//         <div className={`container-fluid sticky-top ${isDarkMode ? "bg-dark text-white" : "bg-white shadow-sm"}`}>
//             <div className="container">
//                 <nav className="navbar navbar-expand-lg navbar-light py-3 py-lg-0">
//                     <NavLink to="/" className="navbar-brand">
//                         <h1 className={`m-0 text-uppercase Clinic fw-bold ${isDarkMode ? "text-white" : "text-dark"}`}>
//                             <i className="fa fa-clinic-medical me-2"></i>Clinic tech
//                         </h1>
//                     </NavLink>
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         onClick={toggleMenu}
//                         aria-expanded={isMenuOpen}
//                         aria-controls="navbarNav"
//                         aria-haspopup="true"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
//                         <ul className="navbar-nav ms-auto">
//                             <li className="nav-item">
//                                 <NavLink
//                                     exact
//                                     to="/"
//                                     className={`nav-item nav-link ${isDarkMode ? "text-white" : ""}`}
//                                     activeClassName="active"
//                                     onClick={handleMenuClose}
//                                 >
//                                     Home
//                                 </NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink
//                                     to="/about"
//                                     className={`nav-item nav-link ${isDarkMode ? "text-white" : ""}`}
//                                     activeClassName="active"
//                                     onClick={handleMenuClose}
//                                 >
//                                     About
//                                 </NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink
//                                     to="/list-doctors"
//                                     className={`nav-item nav-link ${isDarkMode ? "text-white" : ""}`}
//                                     activeClassName="active"
//                                     onClick={handleMenuClose}
//                                 >
//                                     Doctors
//                                 </NavLink>
//                             </li>
//                             {/* Admin Link */}
//                             <li className="nav-item" style={{ marginTop: '15px' }}>
//                                 <NavLink
//                                     to="/admin/login"
//                                     className="nav-link"
//                                     style={({ isActive }) => ({
//                                         backgroundColor: isActive ? '#000' : '#333',
//                                         color: '#fff',
//                                         padding: '10px 20px',
//                                         borderRadius: '30px',
//                                         fontWeight: 'bold',
//                                         textDecoration: 'none',
//                                         transition: '0.3s',
//                                         margintop: '15px',
//                                         boxShadow: isActive ? '0 4px 10px rgba(0,0,0,0.3)' : '',
//                                     })}
//                                 >
//                                     Admin
//                                 </NavLink>
//                             </li>
//                             {isAuthenticated ? (
//                                 <>
//                                     {userRole === "doctor" && (
//                                         <>
//                                         <li className="nav-item">
//                                             <NavLink
//                                                 to="/clinic"
//                                                 className={`nav-link ${isDarkMode ? "text-white" : "text-dark"}`}
//                                                 onClick={handleMenuClose}
//                                             >
//                                                 Available Times
//                                             </NavLink>
//                                         </li>
//                                         <li className="nav-item">
//                                             <NavLink
//                                                 to="/doctor-appointment"
//                                                 className={`nav-link ${isDarkMode ? "text-white" : "text-dark"}`}
//                                                 onClick={handleMenuClose}
//                                             >
//                                                 My Appointments
//                                             </NavLink>
//                                         </li>
//                                     </>
//                                     )}
//                                     {userRole === "patient" && (
//                                         <li className="nav-item">
//                                             <NavLink
//                                                 to="/patient-appointment"
//                                                 className={`nav-item nav-link ${isDarkMode ? "text-white" : ""}`}
//                                                 onClick={handleMenuClose}
//                                             >
//                                                 My Appointments
//                                             </NavLink>
//                                         </li>
//                                     )}
//                                     <li className="nav-item">
//                                         <Link
//                                             className={`nav-link ${isDarkMode ? "text-white" : ""}`}
//                                             to="/doctor-profile"
//                                             onClick={handleMenuClose}
//                                         >
//                                             Profile
//                                         </Link>
//                                     </li>
//                                     <li className="nav-item">
//                                         <button
//                                             className="nav-link text-danger"
//                                             onClick={handleLogout}
//                                         >
//                                             Logout
//                                         </button>
//                                     </li>
//                                 </>
//                             ) : (
//                                 <>
//                                     <li className="nav-item">
//                                         <Link
//                                             className={`nav-link ${isDarkMode ? "text-white" : ""}`}
//                                             to="/login"
//                                             onClick={handleMenuClose}
//                                         >
//                                             Login
//                                         </Link>
//                                     </li>
//                                     <li className="nav-item">
//                                         <Link
//                                             className={`nav-link ${isDarkMode ? "text-white" : ""}`}
//                                             to="/register"
//                                             onClick={handleMenuClose}
//                                         >
//                                             Register
//                                         </Link>
//                                     </li>
//                                 </>
//                             )}
//                         </ul>
//                         {/* Theme toggle button */}
//                         <button
//                             className={`btn btn-outline-secondary ms-2 ${isDarkMode ? "btn-light" : "btn-dark"}`}
//                             onClick={toggleTheme}
//                         >
//                             {isDarkMode ? "Light Mode" : "Dark Mode"}
//                         </button>
//                     </div>
//                 </nav>
//             </div>
//         </div>
//     );
// };

// export default Navbar;
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

                            {/* Conditional Links based on Auth/Role */}
                            {isAuthenticated ? (
                                <>
                                    {/* Doctor Specific */}
                                    {userRole === "doctor" && (
                                        <>
                                            <li className="nav-item">
                                                <NavLink to="/clinic" className="nav-link px-3 py-2" activeClassName="active" onClick={handleMenuClose}> Available Times </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/doctor-appointment" className="nav-link px-3 py-2" activeClassName="active" onClick={handleMenuClose}> My Appointments </NavLink>
                                            </li>
                                        </>
                                    )}
                                    {/* Patient Specific */}
                                    {userRole === "patient" && (
                                        <li className="nav-item">
                                            <NavLink to="/patient-appointment" className="nav-link px-3 py-2" activeClassName="active" onClick={handleMenuClose}> My Appointments </NavLink>
                                        </li>
                                    )}
                                    {/* Common Authenticated Links */}
                                    <li className="nav-item">
                                         {/* Use Link component if NavLink active state isn't needed */}
                                        <Link className="nav-link px-3 py-2" to="/doctor-profile" onClick={handleMenuClose}>
                                            <i className="fas fa-user me-1"></i> Profile {/* Added Icon */}
                                        </Link>
                                    </li>
                                     {/* Separator for buttons on large screens */}
                                    <li className="nav-item d-none d-lg-block mx-lg-1"></li>
                                    <li className="nav-item">
                                        {/* Styled Logout Button */}
                                        <button
                                            className="btn btn-outline-danger btn-sm my-2 my-lg-0 ms-lg-2" // Button styling
                                            onClick={handleLogout} // Logout directly, no need for menu close here
                                        >
                                            <i className="fas fa-sign-out-alt me-1"></i> Logout {/* Added Icon */}
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {/* Links for Non-Authenticated Users */}
                                    {/* Separator for buttons on large screens */}
                                    <li className="nav-item d-none d-lg-block mx-lg-1"></li>
                                    <li className="nav-item">
                                        <Link className="btn btn-outline-primary btn-sm my-2 my-lg-0" to="/login" onClick={handleMenuClose}> Login </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-primary btn-sm my-2 my-lg-0 ms-lg-2" to="/register" onClick={handleMenuClose}> Register </Link>
                                    </li>
                                </>
                            )}
                        
                        </ul>
                        {/* Theme toggle button */}
                        <button
                            className={`btn btn-outline-secondary ms-4 ${isDarkMode ? "btn-light" : "btn-dark"}`}
                            onClick={toggleTheme}
                        >
                            {isDarkMode ? <i class="bi bi-brightness-high"></i>: <i class="bi bi-moon-stars"></i>}
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;