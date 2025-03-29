import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useHistory } from "react-router-dom"; 

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const updateAuthState = () => {
            const token = localStorage.getItem("access_token");
            setIsAuthenticated(!!token);
            const storedRole = localStorage.getItem("user_role");
            setUserRole(storedRole || "");

            if (token) {
                axios.get("http://127.0.0.1:8000/clinic/api/users/me/", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(response => setUserData(response.data))
                .catch(error => console.error("Error fetching user data:", error));
            }
        };

        updateAuthState(); // ✅ تحديث الحالة عند تحميل الصفحة
        window.addEventListener("authChange", updateAuthState); // ✅ استماع لتحديث الحالة فورًا

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
        history.push("/");

    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">Clinic System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/services">Services</Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/appointments">Appointments</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/DoctorProfile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-danger ms-2" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
