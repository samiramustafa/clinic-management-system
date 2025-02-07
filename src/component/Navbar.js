import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
    const [isPagesDropdownOpen, setPagesDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const pagesDropdownRef = useRef(null);
    const profileDropdownRef = useRef(null);

    const togglePagesDropdown = () => setPagesDropdownOpen(!isPagesDropdownOpen);
    const toggleProfileDropdown = () => setProfileDropdownOpen(!isProfileDropdownOpen);

    useEffect(() => {
        const handleClickOutsidePages = (event) => {
            if (pagesDropdownRef.current && !pagesDropdownRef.current.contains(event.target)) {
                setPagesDropdownOpen(false);
            }
        };

        const handleClickOutsideProfile = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsidePages);
        document.addEventListener("mousedown", handleClickOutsideProfile);

        return () => {
            document.removeEventListener("mousedown", handleClickOutsidePages);
            document.removeEventListener("mousedown", handleClickOutsideProfile);
        };
    }, []);


    return (
        <div className="container-fluid sticky-top bg-white shadow-sm">
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
                    <NavLink to="/" className="navbar-brand">
                        <h1 className="m-0 text-uppercase Clinic fw-bold"><i className="fa fa-clinic-medical me-2"></i>Clinic tech</h1>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <NavLink exact to="/" className="nav-item nav-link" activeClassName="active">Home</NavLink>
                            <NavLink to="/about" className="nav-item nav-link" activeClassName="active">About</NavLink>
                            <NavLink to="/service" className="nav-item nav-link" activeClassName="active">Service</NavLink>
                            <NavLink to="/contact" className="nav-item nav-link" activeClassName="active">Contact</NavLink>


                            <div className="nav-item dropdown" ref={pagesDropdownRef}>
                                <button className="nav-link dropdown-toggle" onClick={togglePagesDropdown}>
                                    Pages
                                </button>
                                <div className={`dropdown-menu m-0 ${isPagesDropdownOpen ? "show" : ""}`}>
                                    <NavLink to="/blog" className="dropdown-item">Blog Grid</NavLink>
                                    <NavLink to="/detail" className="dropdown-item">Blog Detail</NavLink>
                                    <NavLink to="/team" className="dropdown-item">The Team</NavLink>
                                    <NavLink to="/testimonial" className="dropdown-item">Testimonial</NavLink>
                                    <NavLink to="/appointment" className="dropdown-item">Appointment</NavLink>
                                    <NavLink to="/search" className="dropdown-item">Search</NavLink>
                                </div>
                            </div>

                            <NavLink to="/Register" className="nav-item nav-link" activeClassName="active">Register</NavLink>


                            <div className="nav-item dropdown" ref={profileDropdownRef}>
                                <button className="nav-link dropdown-toggle" onClick={toggleProfileDropdown}>
                                    <img src="path_to_image" alt="Profile" className="rounded-circle" width="30" height="30" />
                                </button>
                                <div className={`dropdown-menu dropdown-menu-end m-0 ${isProfileDropdownOpen ? "show" : ""}`}>
                                    <NavLink to="/profile" className="dropdown-item">My Profile</NavLink>
                                    <NavLink to="/myappointment" className="dropdown-item">My Appointment</NavLink>
                                    <NavLink to="/logout" className="dropdown-item">Logout</NavLink>
                                </div>
                            </div>

                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;