// import React, { useState, useRef, useEffect } from "react";
// import { NavLink, useHistory } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Details from '../api/Details';
// import ListDoctors from '../api/list';
// import Login from './Login';

// function Navbar() {
//     const [isPagesDropdownOpen, setPagesDropdownOpen] = useState(false);
//     const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

//     const pagesDropdownRef = useRef(null);
//     const profileDropdownRef = useRef(null);

//     const togglePagesDropdown = () => setPagesDropdownOpen(!isPagesDropdownOpen);
//     const toggleProfileDropdown = () => setProfileDropdownOpen(!isProfileDropdownOpen);

//     const history = useHistory(); // إضافة useHistory

//     useEffect(() => {
//         const handleClickOutsidePages = (event) => {
//             if (pagesDropdownRef.current && !pagesDropdownRef.current.contains(event.target)) {
//                 setPagesDropdownOpen(false);
//             }
//         };

//         const handleClickOutsideProfile = (event) => {
//             if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
//                 setProfileDropdownOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutsidePages);
//         document.addEventListener("mousedown", handleClickOutsideProfile);

//         return () => {
//             document.removeEventListener("mousedown", handleClickOutsidePages);
//             document.removeEventListener("mousedown", handleClickOutsideProfile);
//         };
//     }, []);

//     // استرداد معلومات المستخدم من localStorage
//     const loginSession = JSON.parse(localStorage.getItem("loginSession"));
//     const userRole = loginSession ? loginSession.role : null;
//     const isLoggedIn = !!loginSession;

//     // تحديد رابط البروفايل بناءً على دور المستخدم
//     let profileLink = null;
//     if (userRole === "doctor") {
//         profileLink = "/doctor-profile";
//     } else if (userRole === "patient") {
//         profileLink = "/patient-profile";
//     }

//     console.log("profileLink:", profileLink); // إضافة عبارة console.log

//     // دالة تسجيل الخروج
//     const handleLogout = () => {
//         localStorage.removeItem("loginSession"); // مسح معلومات تسجيل الدخول من localStorage
//         history.push("/login"); // إعادة التوجيه إلى صفحة تسجيل الدخول
//     };

//     return (
//         <div className="container-fluid sticky-top bg-white shadow-sm">
//             <div className="container">
//                 <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
//                     <NavLink to="/" className="navbar-brand">
//                         <h1 className="m-0 text-uppercase Clinic fw-bold"><i className="fa fa-clinic-medical me-2"></i>Clinic tech</h1>
//                     </NavLink>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarCollapse">
//                         <div className="navbar-nav ms-auto py-0">
//                             <NavLink exact to="/" className="nav-item nav-link" activeClassName="active">Home</NavLink>
//                             <NavLink to="/about" className="nav-item nav-link" activeClassName="active">About</NavLink>
//                             <NavLink to="/service" className="nav-item nav-link" activeClassName="active">Service</NavLink>
//                             <NavLink to="/myappointment" className="nav-item nav-link">My Appointment</NavLink>

                         

//                             <div className="nav-item dropdown" ref={pagesDropdownRef}>
//                                 <button className="nav-link dropdown-toggle" onClick={togglePagesDropdown}>
//                                     Pages
//                                 </button>
//                                 <div className={`dropdown-menu m-0 ${isPagesDropdownOpen ? "show" : ""}`}>
//                                     <NavLink to="/ListDoctors" className="dropdown-item">ListDoctors</NavLink>
//                                     <NavLink to="/Details" className="dropdown-item">Details</NavLink>
//                                     <NavLink to="/team" className="dropdown-item">The Team</NavLink>
//                                     <NavLink to="/testimonial" className="dropdown-item">Testimonial</NavLink>
//                                     <NavLink to="/appointment" className="dropdown-item">Appointment</NavLink>
//                                     <NavLink to="/search" className="dropdown-item">Search</NavLink>
//                                 </div>
//                             </div>

                            

//                             {/* إضافة رابط البروفايل */}
//                             {isLoggedIn && profileLink && (
//                                 <NavLink to={profileLink} className="nav-item nav-link" activeClassName="active">
//                                     Profile
//                                 </NavLink>
//                             )}

//                                {/* عرض رابط تسجيل الدخول/تسجيل الخروج بشكل مشروط */}
//                                {!isLoggedIn ? (
//                                 <NavLink to="/login" className="nav-item nav-link" activeClassName="active">Login</NavLink>
//                             ) : (
//                                 <button className="nav-item nav-link" onClick={handleLogout} style={{ cursor: "pointer", border: "none", background: "none",color:"red" }}>
//                                     Logout
//                                 </button>
//                             )}

//                             {/* <div className="nav-item dropdown" ref={profileDropdownRef}>
//                                 <button className="nav-link dropdown-toggle" onClick={toggleProfileDropdown}>
//                                     <img src="path_to_image" alt="Profile" className="rounded-circle" width="30" height="30" />
//                                 </button>
                               
//                             </div> */}
//                         </div>
//                     </div>
//                 </nav>
//             </div>
//         </div>
//     );
// }

// export default Navbar;
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Details from '../api/Details';
import ListDoctors from '../api/list';
import Login from './Login';

function Navbar() {
    const [isPagesDropdownOpen, setPagesDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [loginSession, setLoginSession] = useState(JSON.parse(localStorage.getItem("loginSession"))); // إضافة useState لمراقبة loginSession

    const pagesDropdownRef = useRef(null);
    const profileDropdownRef = useRef(null);

    const togglePagesDropdown = () => setPagesDropdownOpen(!isPagesDropdownOpen);
    const toggleProfileDropdown = () => setProfileDropdownOpen(!isProfileDropdownOpen);

    const history = useHistory(); // إضافة useHistory

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

        // إضافة مستمع لتغييرات localStorage
        const handleStorageChange = () => {
            setLoginSession(JSON.parse(localStorage.getItem("loginSession"))); // تحديث حالة loginSession عند تغيير localStorage
        };

        window.addEventListener('storage', handleStorageChange); // إضافة مستمع لتغييرات localStorage

        return () => {
            document.removeEventListener("mousedown", handleClickOutsidePages);
            document.removeEventListener("mousedown", handleClickOutsideProfile);
            window.removeEventListener('storage', handleStorageChange); // إزالة المستمع عند إلغاء تحميل المكون
        };
    }, []);

    // استرداد معلومات المستخدم من localStorage
    const userRole = loginSession ? loginSession.role : null;
    const isLoggedIn = !!loginSession;

    // تحديد رابط البروفايل بناءً على دور المستخدم
    let profileLink = null;
    if (userRole === "doctor") {
        profileLink = "/doctor-profile";
    } else if (userRole === "patient") {
        profileLink = "/patient-profile";
    }

    console.log("profileLink:", profileLink); // إضافة عبارة console.log

    // دالة تسجيل الخروج
    const handleLogout = () => {
        localStorage.removeItem("loginSession"); // مسح معلومات تسجيل الدخول من localStorage
        setLoginSession(null); // تحديث حالة loginSession إلى null
        history.push("/login"); // إعادة التوجيه إلى صفحة تسجيل الدخول
    };

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
                            <NavLink to="/myappointment" className="nav-item nav-link">My Appointment</NavLink>

                            {/* عرض رابط تسجيل الدخول/تسجيل الخروج بشكل مشروط */}
                            {!isLoggedIn ? (
                                <NavLink to="/login" className="nav-item nav-link" activeClassName="active">Login</NavLink>
                            ) : (
                                <button className="nav-item nav-link" onClick={handleLogout} style={{ cursor: "pointer", border: "none", background: "none", color: "red" }}>
                                    Logout
                                </button>
                            )}

                            <div className="nav-item dropdown" ref={pagesDropdownRef}>
                                <button className="nav-link dropdown-toggle" onClick={togglePagesDropdown}>
                                    Pages
                                </button>
                                <div className={`dropdown-menu m-0 ${isPagesDropdownOpen ? "show" : ""}`}>
                                    <NavLink to="/ListDoctors" className="dropdown-item">ListDoctors</NavLink>
                                    <NavLink to="/Details" className="dropdown-item">Details</NavLink>
                                    <NavLink to="/team" className="dropdown-item">The Team</NavLink>
                                    <NavLink to="/testimonial" className="dropdown-item">Testimonial</NavLink>
                                    <NavLink to="/appointment" className="dropdown-item">Appointment</NavLink>
                                    <NavLink to="/search" className="dropdown-item">Search</NavLink>
                                </div>
                            </div>

                            {/* إضافة رابط البروفايل */}
                            {isLoggedIn && profileLink && (
                                <NavLink to={profileLink} className="nav-item nav-link" activeClassName="active">
                                    Profile
                                </NavLink>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;