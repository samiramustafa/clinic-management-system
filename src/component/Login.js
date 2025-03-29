

// // import React, { useState } from "react";
// // import Title from "./Title";
// // import InputField from "./Input";
// // import { useHistory, Link } from "react-router-dom";

// // function Login() {
// //     const [formData, setFormData] = useState({
// //         email: "",
// //         password: "",
// //     });

// //     const [errors, setErrors] = useState({});
// //     const [showPassword, setShowPassword] = useState(false);
// //     const [showSnackbar, setShowSnackbar] = useState(false);
// //     const [snackbarMessage, setSnackbarMessage] = useState("");
// //     const [alertVariant, setAlertVariant] = useState("danger");
// //     const history = useHistory();



// //     const regexPatterns = {
// //         email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
// //         password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
// //     };
// //     const validateField = (name, value) => {
// //         let newErrors = "";

// //         if (!value) {
// //             return "this field is required";
// //         }
// //         if (regexPatterns[name] && !regexPatterns[name].test(value)) {
// //             switch (name) {
// //                 case "email":
// //                     newErrors = "Invalid email format";
// //                     break;
// //                 case "password":
// //                     newErrors = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number";
// //                     break;
// //                 default:
// //                     break;
// //             }
// //             return newErrors;
// //         }
// //     };
// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData({ ...formData, [name]: value });
// //         setErrors({ ...errors, [name]: validateField(name, value) });

// //     };


// //     const validate = () => {
// //         const tempErrors = {};
// //         Object.keys(formData).forEach((key) => {
// //             tempErrors[key] = validateField(key, formData[key]);
// //         });

// //         setErrors(tempErrors);
// //         return Object.keys(tempErrors).every((key) => !tempErrors[key]);
// //     };


// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         if (!validate()) return;

// //         const users = JSON.parse(localStorage.getItem("clinic_data")) || [];

// //         const user = users.find(
// //             (user) => user.email === formData.email && user.password === formData.password
// //         );

// //         if (!user) {
// //             setSnackbarMessage("Invalid email or password! Please try again.");
// //             setAlertVariant("danger");
// //             setShowSnackbar(true);
// //             return;

// //         }

// //         localStorage.setItem("loginSession", JSON.stringify({ username: user.username, isAdmin: user.isAdmin }));


// //         setSnackbarMessage("Login successful! Redirecting...");
// //         setAlertVariant("success");
// //         setShowSnackbar(true);


// //         setTimeout(() => {
// //             if (user.role === "doctor") {
// //                 history.push("/DoctorProfile");
// //             } else if (user.role === "patient") {
// //                 history.push("/PatientProfile"); 
// //             }
// //         }, 1000);
// //     };



// //     return (
// //         <div className="d-flex flex-column align-items-center py-5">
// //             <div className="shadow p-4" style={{ width: "500px" }}>
// //             {showSnackbar && (
// //                     <div className={`alert alert-${alertVariant} alert-dismissible fade show`} role="alert">
// //                         <strong>{snackbarMessage}</strong>
// //                         <button type="button" className="btn-close" onClick={() => setShowSnackbar(false)}></button>
// //                     </div>
// //                 )}
// //                 <Title titleName="Log In" />
// //                 <form onSubmit={handleSubmit}>

// //                     <InputField
// //                         label="Email"
// //                         type="email"
// //                         name="email"
// //                         value={formData.email}
// //                         onChange={handleChange}
// //                         isInvalid={Boolean(errors.email)}
// //                         feedback={errors.email}
// //                         placeholder="Enter your email"
// //                     />


// //                     <InputField
// //                         label="Password"
// //                         type={showPassword ? "text" : "password"}
// //                         name="password"
// //                         value={formData.password}
// //                         onChange={handleChange}
// //                         isInvalid={Boolean(errors.password)}
// //                         feedback={errors.password}
// //                         placeholder="Enter your password"
// //                         showPasswordToggle
// //                         onPasswordToggle={() => setShowPassword(!showPassword)}
// //                     />

// //                     <button variant="primary" type="submit" className="btn btn-primary w-100 mt-3 fw-bold fs-3">Login</button>
// //                 </form>
// //                 <div className="d-flex align-items-center my-3">
// //                     <hr className="flex-grow-1" />
// //                     <span className="mx-3">I don't have an account</span>
// //                     <hr className="flex-grow-1" />
// //                 </div>
// //                 <Link to="/Register" className="btn btn-light w-100 border fw-bold fs-5 text-dark text-decoration-none">
// //                     Create your account
// //                 </Link>
// //                 <div className="text-center mt-4" style={{ fontSize: '12px' }}>
// //                     <a href="#" className="text-decoration-none me-3">Conditions of Use</a>
// //                     <a href="#" className="text-decoration-none me-3">Notice of Use</a>
// //                     <a href="#" className="text-decoration-none">Help</a>
// //                     <p className="mt-2 text-muted">© 1996-2024, Clinic.com, Inc. or its affiliates</p>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Login;




// import React, { useState } from "react";
// import Title from "./Title";
// import InputField from "./Input";
// import { useHistory, Link } from "react-router-dom";

// function Login() {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [showSnackbar, setShowSnackbar] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");
//     const [alertVariant, setAlertVariant] = useState("danger");
//     const history = useHistory();



//     const regexPatterns = {
//         email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//         password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
//     };
//     const validateField = (name, value) => {
//         let newErrors = "";

//         if (!value) {
//             return "this field is required";
//         }
//         if (regexPatterns[name] && !regexPatterns[name].test(value)) {
//             switch (name) {
//                 case "email":
//                     newErrors = "Invalid email format";
//                     break;
//                 case "password":
//                     newErrors = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number";
//                     break;
//                 default:
//                     break;
//             }
//             return newErrors;
//         }
//     };
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         setErrors({ ...errors, [name]: validateField(name, value) });

//     };


//     const validate = () => {
//         const tempErrors = {};
//         Object.keys(formData).forEach((key) => {
//             tempErrors[key] = validateField(key, formData[key]);
//         });

//         setErrors(tempErrors);
//         return Object.keys(tempErrors).every((key) => !tempErrors[key]);
//     };


//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     if (!validate()) return;

//     //     const users = JSON.parse(localStorage.getItem("clinic_data")) || [];

//     //     const user = users.find(
//     //         (user) => user.email === formData.email && user.password === formData.password
//     //     );

//     //     if (!user) {
//     //         setSnackbarMessage("Invalid email or password! Please try again.");
//     //         setAlertVariant("danger");
//     //         setShowSnackbar(true);
//     //         return;
//     //     }

//     //     localStorage.setItem("loginSession", JSON.stringify({ username: user.username, isAdmin: user.isAdmin }));

//     //     setSnackbarMessage("Login successful! Redirecting...");
//     //     setAlertVariant("success");
//     //     setShowSnackbar(true);


//     //     setTimeout(() => {
//     //         if (user.role === "doctor") {
//     //             history.push("/DoctorProfile");
//     //         } else if (user.role === "patient") {
//     //             history.push("/PatientProfile"); 
//     //         }
//     //     }, 1000);
//     // };
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("handleSubmit called");
//         if (!validate()) {
//             console.log("Validation failed");
//             return;
//         }
//         console.log("Validation passed");
    
//         const users = JSON.parse(localStorage.getItem("clinic_data")) || [];
//         console.log("Users from localStorage:", users);
    
//         const user = users.find(
//             (user) => user.email === formData.email && user.password === formData.password
//         );
    
//         if (!user) {
//             console.log("User not found");
//             setSnackbarMessage("Invalid email or password! Please try again.");
//             setAlertVariant("danger");
//             setShowSnackbar(true);
//             return;
//         }
    
//         console.log("User found:", user);
//         localStorage.setItem("loginSession", JSON.stringify({ username: user.username, isAdmin: user.isAdmin, role: user.role })); // تم إضافة دور المستخدم
//         // تم استبدال isAdmin ب role
    
//         setSnackbarMessage("Login successful! Redirecting...");
//         setAlertVariant("success");
//         setShowSnackbar(true);
//         console.log("Redirecting to profile page");
    
//         // تحديد مسار إعادة التوجيه بناءً على دور المستخدم
//         const profilePath = user.role === "doctor" ? "/doctor-profile" : "/patient-profile";
    
//         setTimeout(() => {
//             // تمرير بيانات المستخدم إلى صفحة الملف الشخصي باستخدام state
//             history.push({
//                 pathname: profilePath,
//                 state: { user: user }
//             });
//         }, 1000);
//     };

//     return (
//         <div className="d-flex flex-column align-items-center py-5">
//             <div className="shadow p-4" style={{ width: "500px" }}>
//             {showSnackbar && (
//                     <div className={`alert alert-${alertVariant} alert-dismissible fade show`} role="alert">
//                         <strong>{snackbarMessage}</strong>
//                         <button type="button" className="btn-close" onClick={() => setShowSnackbar(false)}></button>
//                     </div>
//                 )}
//                 <Title titleName="Log In" />
//                 <form onSubmit={handleSubmit}>

//                     <InputField
//                         label="Email"
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         isInvalid={Boolean(errors.email)}
//                         feedback={errors.email}
//                         placeholder="Enter your email"
//                     />


//                     <InputField
//                         label="Password"
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         isInvalid={Boolean(errors.password)}
//                         feedback={errors.password}
//                         placeholder="Enter your password"
//                         showPasswordToggle
//                         onPasswordToggle={() => setShowPassword(!showPassword)}
//                     />

//                     <button variant="primary" type="submit" className="btn btn-primary w-100 mt-3 fw-bold fs-3">Login</button>
//                 </form>
//                 <div className="d-flex align-items-center my-3">
//                     <hr className="flex-grow-1" />
//                     <span className="mx-3">I don't have an account</span>
//                     <hr className="flex-grow-1" />
//                 </div>
//                 <Link to="/Register" className="btn btn-light w-100 border fw-bold fs-5 text-dark text-decoration-none">
//                     Create your account
//                 </Link>
//                 <div className="text-center mt-4" style={{ fontSize: '12px' }}>
//                     <a href="#" className="text-decoration-none me-3">Conditions of Use</a>
//                     <a href="#" className="text-decoration-none me-3">Notice of Use</a>
//                     <a href="#" className="text-decoration-none">Help</a>
//                     <p className="mt-2 text-muted">© 1996-2024, Clinic.com, Inc. or its affiliates</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;


// import React, { useState } from "react";
// import axios from "axios";
// import InputField from "../component/Input";
// import { useHistory } from "react-router-dom";
// import Title from "../component/Title";

// const Login = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         password: "",
//     });
//     const [error, setError] = useState("");
//     const history = useHistory();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(""); // مسح أي خطأ قديم
    
//         try {
//             const response = await axios.post("http://127.0.0.1:8000/api/token/", {
//                 username: formData.username,
//                 password: formData.password,
//             });
    
//             // حفظ الـ access token في localStorage
//             localStorage.setItem("access_token", response.data.access);
//             localStorage.setItem("refresh_token", response.data.refresh);
    
//             console.log("✅ Login successful!", response.data);
    
//             // تحويل المستخدم إلى الصفحة الرئيسية بعد تسجيل الدخول
//             history.push("/dashboard");
    
//         } catch (err) {
//             setError("❌ اسم المستخدم أو كلمة المرور غير صحيحة.");
//             console.error("❌ Login failed:", err.response?.data || err.message);
//         }
//     };
    

//     return (
//         <div>
//             <Title text="Login" />
//             <form onSubmit={handleSubmit}>
//                 <InputField label="Username" name="username" value={formData.username} onChange={handleChange} required />
//                 <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />

//                 {error && <p style={{ color: "red" }}>{error}</p>}

//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // حالة التحميل
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true); // ابدأ التحميل

        try {
            const response = await axios.post("http://127.0.0.1:8000/clinic/api/token/", {
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);

            const userRole = response.data.role;
            const profilePath = userRole === "doctor" ? "/doctor-profile" : "/patient-profile";

            history.push({
                pathname: profilePath,
                state: { email: response.data.email, role: userRole }
            });

        } catch (err) {
            if (err.response && err.response.data && err.response.data.detail) {
                setError(`❌ ${err.response.data.detail}`); // استخدم رسالة الخطأ من الخادم
            } else {
                setError("❌ حدث خطأ غير متوقع."); // رسالة افتراضية في حالة عدم وجود تفاصيل
            }
        } finally {
            setLoading(false); // انتهى التحميل سواء بنجاح أو بفشل
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;




