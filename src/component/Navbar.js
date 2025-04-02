import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
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
                .then(response => {
                    setUserData(response.data);
                    setUserRole(response.data.role);
                    // console.log("User Data:", response.data);
                    // console.log("User Role:", response.data.role);
                })
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

        <div className="container-fluid sticky-top bg-white shadow-sm">
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
                    <NavLink to="/" className="navbar-brand">
                        <h1 className="m-0 text-uppercase Clinic fw-bold">
                            <i className="fa fa-clinic-medical me-2"></i>Clinic tech
                        </h1>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink exact to="/" className="nav-item nav-link" activeClassName="active">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-item nav-link" activeClassName="active">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/ListDoctors" className="nav-item nav-link" activeClassName="active">Doctors</NavLink>
                            </li>





                            {isAuthenticated ? (
                                <>
                                    {userRole === "doctor" ? (
                                        <li className="nav-item">
                                            <NavLink to="/clinic" className="nav-item nav-link">My Appointments</NavLink>
                                        </li>
                                    ) : userRole === "patient" ? (
                                        <li className="nav-item">
                                            <NavLink to="/patient-appointment" className="nav-item nav-link">My Appointments</NavLink>
                                        </li>
                                    ) : null}
                                    <li className="nav-item">
                                        <Link className="nav-link mr-2" to="/DoctorProfile">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link text-danger" onClick={handleLogout}>Logout</button>
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
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
