// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import InputField from "./Input";
// import { useHistory, Link } from "react-router-dom";
// import Title from "./Title";

// const Register = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         password: "",
//         nationalId: "",
//         role: "patient",
//         age: "",
//         gender: "",
//         address: "",
//         phoneNumber: "",
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
//         phoneNumber: /^(010|011|012|015)\d{8}$/,
//         username: /^[a-zA-Z0-9]{5,20}$/,
//         nationalId: /^(2|3)\d{13}$/,
//         age: /^[1-9][0-9]?$|^100$/, 
//     };

//     const validateField = (name, value) => {
//         if (!value) {
//             return "This field is required";
//         }

//         if (regexPatterns[name] && !regexPatterns[name].test(value)) {
//             const messages = {
//                 email: "Invalid email format",
//                 password: "Password must be at least 8 characters long, contain an uppercase, a lowercase letter, and a number.",
//                 phoneNumber: "Phone number must be 11 digits and start with 010, 011, 012, or 015.",
//                 username: "Username must be 5-20 characters long.",
//                 nationalId: "National ID must be 14 digits.",
//                 age: "Age must be a valid number between 1 and 100.",
//             };
//             return messages[name] || "Invalid input";
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });

        
//         if (formData.role === "doctor" && ["age", "gender", "address", "phoneNumber"].includes(name)) {
//             return;
//         }

//         let updatedErrors = { ...errors, [name]: validateField(name, value) };
//         setErrors(updatedErrors);
//     };

//     const validate = () => {
//         const tempErrors = {};
//         Object.keys(formData).forEach((key) => {
          
//             if (formData.role === "doctor" && ["age", "gender", "address", "phoneNumber"].includes(key)) {
//                 return;
//             }
//             tempErrors[key] = validateField(key, formData[key]);
//         });

//         setErrors(tempErrors);
//         return Object.keys(tempErrors).every((key) => !tempErrors[key]);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!validate()) return;

//         let users = JSON.parse(localStorage.getItem("clinic_data")) || [];

//         if (users.some((user) => user.username === formData.username)) {
//             setSnackbarMessage("Username already exists!");
//             setShowSnackbar(true);
//             return;
//         }
//         if (users.some((user) => user.email === formData.email)) {
//             setSnackbarMessage("Email already exists!");
//             setAlertVariant("danger");
//             setShowSnackbar(true);
//             return;
//         }

      
//         const userData = formData.role === "doctor"
//             ? (({ age, gender, address, phoneNumber, ...rest }) => rest)(formData)
//             : formData;

//         users.push(userData);
//         localStorage.setItem("clinic_data", JSON.stringify(users));

//         setSnackbarMessage("Account created successfully!");
//         setAlertVariant("success");
//         setShowSnackbar(true);

//         setTimeout(() => {
//             history.push("/");
//         }, 1000);
//     };

//     return (
//         <div className="container d-flex flex-column align-items-center py-5">
//             <div className="shadow p-4" style={{ width: "500px" }}>
//                 {showSnackbar && (
//                     <div className={`alert alert-${alertVariant} alert-dismissible fade show`} role="alert">
//                         <strong>{snackbarMessage}</strong>
//                         <button type="button" className="btn-close" onClick={() => setShowSnackbar(false)}></button>
//                     </div>
//                 )}
//                 <Title titleName="Register" />
//                 <form onSubmit={handleSubmit}>

//                     <InputField label="Username" type="text" name="username" value={formData.username} onChange={handleChange} isInvalid={Boolean(errors.username)} feedback={errors.username} />

//                     <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={Boolean(errors.email)} feedback={errors.email} />

//                     <InputField label="Password" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} isInvalid={Boolean(errors.password)} feedback={errors.password} showPasswordToggle={true} onPasswordToggle={() => setShowPassword(!showPassword)} />

//                     <InputField label="National ID" type="text" name="nationalId" value={formData.nationalId} onChange={handleChange} isInvalid={Boolean(errors.nationalId)} feedback={errors.nationalId} />

//                     <div className="mb-3">
//                         <label className="form-label">Role</label>
//                         <select className="form-select" name="role" value={formData.role} onChange={handleChange}>
//                             <option value="patient">Patient</option>
//                             <option value="doctor">Doctor</option>
//                         </select>
//                     </div>

//                     {formData.role === "patient" && (
//                         <>
//                             <InputField label="Age" type="number" name="age" value={formData.age} onChange={handleChange} isInvalid={Boolean(errors.age)} feedback={errors.age} />

//                             <div className="mb-3">
//                                 <label className="form-label">Gender</label>
//                                 <select className={`form-select ${errors.gender ? "is-invalid" : ""}`} name="gender" value={formData.gender} onChange={handleChange}>
//                                     <option value="">Select Gender</option>
//                                     <option value="male">Male</option>
//                                     <option value="female">Female</option>
//                                 </select>
//                                 {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
//                             </div>

//                             <InputField label="Address" type="text" name="address" value={formData.address} onChange={handleChange} isInvalid={Boolean(errors.address)} feedback={errors.address} />

//                             <InputField label="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} isInvalid={Boolean(errors.phoneNumber)} feedback={errors.phoneNumber} />
//                         </>
//                     )}

//                     <button type="submit" className="btn btn-primary w-100 mt-3 fw-bold fs-3">Register</button>
//                 </form>
//                 <div className="d-flex align-items-center my-3">
//                      <hr className="flex-grow-1" />
//                      <span className="mx-3">I don't have an account</span>
//                      <hr className="flex-grow-1" />
//                  </div>
//                  <Link to="/login" className="btn btn-light w-100 border fw-bold fs-5 text-dark text-decoration-none fw-bold fs-4">
//                      Login
//                  </Link>
//                  <div className="text-center mt-4" style={{ fontSize: '12px' }}>
//                      <a href="#" className="text-decoration-none me-3">Conditions of Use</a>
//                      <a href="#" className="text-decoration-none me-3">Notice of Use</a>
//                      <a href="#" className="text-decoration-none">Help</a>
//                      <p className="mt-2 text-muted">© 1996-2024, Clinic.com, Inc. or its affiliates</p>
//                  </div>
//             </div>
            
//         </div>
//     );
// };

// export default Register;

<<<<<<< HEAD
=======
// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import InputField from "./Input";
// import { useHistory, Link } from "react-router-dom";
// import Title from "./Title";

// const Register = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         password: "",
//         nationalId: "",
//         role: "", // الدور يجب أن يكون إجباريًا
//         age: "",
//         gender: "",
//         address: "",
//         phoneNumber: "",
//         specialization: "", // التخصص
//         jobTitle: "", // الدرجة الوظيفية
//         clinicAddress: "", // عنوان العيادة
//     });
//     const [profileImage, setProfileImage] = useState(null); // State لتخزين الصورة
//     const [imageError, setImageError] = useState(""); // State لعرض خطأ الصورة
//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [showSnackbar, setShowSnackbar] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");
//     const [alertVariant, setAlertVariant] = useState("danger");
//     const history = useHistory();

//     const regexPatterns = {
//         email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//         password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
//         phoneNumber: /^(010|011|012|015)\d{8}$/,
//         username: /^[a-zA-Z0-9]{5,20}$/,
//         nationalId: /^(2|3)\d{13}$/,
//         age: /^[1-9][0-9]?$|^100$/,
//     };

//     const validateField = (name, value) => {
//         if (!value) {
//             return "This field is required";
//         }

//         if (regexPatterns[name] && !regexPatterns[name].test(value)) {
//             const messages = {
//                 email: "Invalid email format",
//                 password: "Password must be at least 8 characters long, contain an uppercase, a lowercase letter, and a number.",
//                 phoneNumber: "Phone number must be 11 digits and start with 010, 011, 012, or 015.",
//                 username: "Username must be 5-20 characters long.",
//                 nationalId: "National ID must be 14 digits.",
//                 age: "Age must be a valid number between 1 and 100.",
//             };
//             return messages[name] || "Invalid input";
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });

//         let updatedErrors = { ...errors, [name]: validateField(name, value) };
//         setErrors(updatedErrors);
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setProfileImage(file);
//         setImageError(""); // مسح الخطأ عند اختيار صورة جديدة
//     };

//     const validate = () => {
//         const tempErrors = {};
//         let isValid = true;

//         // التحقق من الدور
//         if (!formData.role) {
//             tempErrors.role = "Please select a role";
//             isValid = false;
//         }

//         // التحقق من الحقول الإجبارية بغض النظر عن الدور
//         ["username", "email", "password", "phoneNumber"].forEach((key) => {
//             tempErrors[key] = validateField(key, formData[key]);
//             if (tempErrors[key]) isValid = false;
//         });

//         // التحقق من الصورة
//         if (!profileImage) {
//             setImageError("Profile image is required");
//             isValid = false;
//         } else {
//             setImageError("");
//         }

//         if (formData.role === "patient") {
//             // التحقق من حقول المريض فقط
//             ["nationalId", "age", "gender", "address"].forEach((key) => {
//                 tempErrors[key] = validateField(key, formData[key]);
//                 if (tempErrors[key]) isValid = false;
//             });
//         }

//         if (formData.role === "doctor") {
//             // التحقق من حقول الطبيب
//             ["specialization", "jobTitle", "clinicAddress"].forEach((key) => {
//                 if (!formData[key]) {
//                     tempErrors[key] = "This field is required";
//                     isValid = false;
//                 }
//             });
//         }

//         setErrors(tempErrors);
//         return isValid;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!validate()) return;

//         let users = JSON.parse(localStorage.getItem("clinic_data")) || [];

//         if (users.some((user) => user.username === formData.username)) {
//             setSnackbarMessage("Username already exists!");
//             setShowSnackbar(true);
//             return;
//         }

//         if (users.some((user) => user.email === formData.email)) {
//             setSnackbarMessage("Email already exists!");
//             setAlertVariant("danger");
//             setShowSnackbar(true);
//             return;
//         }

//         // إضافة الصورة إلى بيانات المستخدم
//         const userData = {
//             username: formData.username,
//             email: formData.email,
//             password: formData.password,
//             phoneNumber: formData.phoneNumber,
//             profileImage: profileImage.name, // أو يمكنك تخزين مسار الصورة إذا كنت سترفعها إلى خادم
//             role: formData.role,
//         };

//         if (formData.role === "patient") {
//             userData.nationalId = formData.nationalId;
//             userData.age = formData.age;
//             userData.gender = formData.gender;
//             userData.address = formData.address;
//         } else if (formData.role === "doctor") {
//             userData.specialization = formData.specialization;
//             userData.jobTitle = formData.jobTitle;
//             userData.clinicAddress = formData.clinicAddress;
//         }

//         users.push(userData);
//         localStorage.setItem("clinic_data", JSON.stringify(users));

//         setSnackbarMessage("Account created successfully!");
//         setAlertVariant("success");
//         setShowSnackbar(true);

//         setTimeout(() => {
//             history.push("/");
//         }, 1000);
//     };

//     return (
//         <div className="container d-flex flex-column align-items-center py-5">
//             <div className="shadow p-4" style={{ width: "500px" }}>
//                 {showSnackbar && (
//                     <div className={`alert alert-${alertVariant} alert-dismissible fade show`} role="alert">
//                         <strong>{snackbarMessage}</strong>
//                         <button type="button" className="btn-close" onClick={() => setShowSnackbar(false)}></button>
//                     </div>
//                 )}
//                 <Title titleName="Register" />
//                 <form onSubmit={handleSubmit}>

//                     <div className="mb-3">
//                         <label className="form-label">Role</label>
//                         <select className={`form-select ${errors.role ? "is-invalid" : ""}`} name="role" value={formData.role} onChange={handleChange}>
//                             <option value="">Select Role</option>
//                             <option value="patient">Patient</option>
//                             <option value="doctor">Doctor</option>
//                         </select>
//                         {errors.role && <div className="invalid-feedback">{errors.role}</div>}
//                     </div>

//                     <InputField label="Username" type="text" name="username" value={formData.username} onChange={handleChange} isInvalid={Boolean(errors.username)} feedback={errors.username} />

//                     <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={Boolean(errors.email)} feedback={errors.email} />

//                     <InputField label="Password" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} isInvalid={Boolean(errors.password)} feedback={errors.password} showPasswordToggle={true} onPasswordToggle={() => setShowPassword(!showPassword)} />

//                     <InputField label="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} isInvalid={Boolean(errors.phoneNumber)} feedback={errors.phoneNumber} />

//                     {formData.role === "patient" && (
//                         <>
//                             <InputField label="National ID" type="text" name="nationalId" value={formData.nationalId} onChange={handleChange} isInvalid={Boolean(errors.nationalId)} feedback={errors.nationalId} />

//                             <InputField label="Age" type="number" name="age" value={formData.age} onChange={handleChange} isInvalid={Boolean(errors.age)} feedback={errors.age} />

//                             <div className="mb-3">
//                                 <label className="form-label">Gender</label>
//                                 <select className={`form-select ${errors.gender ? "is-invalid" : ""}`} name="gender" value={formData.gender} onChange={handleChange}>
//                                     <option value="">Select Gender</option>
//                                     <option value="male">Male</option>
//                                     <option value="female">Female</option>
//                                 </select>
//                                 {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
//                             </div>

//                             <InputField label="Address" type="text" name="address" value={formData.address} onChange={handleChange} isInvalid={Boolean(errors.address)} feedback={errors.address} />
//                         </>
//                     )}

//                     {formData.role === "doctor" && (
//                         <>
//                             <InputField label="Specialization" type="text" name="specialization" value={formData.specialization} onChange={handleChange} isInvalid={Boolean(errors.specialization)} feedback={errors.specialization} />

//                             <InputField label="Job Title" type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} isInvalid={Boolean(errors.jobTitle)} feedback={errors.jobTitle} />

//                             <InputField label="Clinic Address" type="text" name="clinicAddress" value={formData.clinicAddress} onChange={handleChange} isInvalid={Boolean(errors.clinicAddress)} feedback={errors.clinicAddress} />
//                         </>
//                     )}

//                     <div className="mb-3">
//                         <label htmlFor="profileImage" className="form-label">Profile Image</label>
//                         <input
//                             type="file"
//                             className={`form-control ${imageError ? "is-invalid" : ""}`}
//                             id="profileImage"
//                             name="profileImage"
//                             onChange={handleImageChange}
//                             accept="image/*" // لقبول الصور فقط
//                             required
//                         />
//                         {imageError && <div className="invalid-feedback">{imageError}</div>}
//                     </div>

//                     <button type="submit" className="btn btn-primary w-100 mt-3 fw-bold fs-3">Register</button>
//                 </form>
//                 <div className="d-flex align-items-center my-3">
//                     <hr className="flex-grow-1" />
//                     <span className="mx-3">I don't have an account</span>
//                     <hr className="flex-grow-1" />
//                 </div>
//                 <Link to="/login" className="btn btn-light w-100 border fw-bold fs-5 text-dark text-decoration-none fw-bold fs-4">
//                     Login
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
// };

// export default Register;


// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import InputField from "./Input";
// import { useHistory, Link } from "react-router-dom";
// import Title from "./Title";

// const Register = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         password: "",
//         nationalId: "",
//         role: "", // الدور يجب أن يكون إجباريًا
//         age: "",
//         gender: "",
//         address: "",
//         phoneNumber: "",
//         specialization: "", // التخصص
//         jobTitle: "", // الدرجة الوظيفية
//         clinicAddress: "", // عنوان العيادة
//     });
//     const [profileImage, setProfileImage] = useState(null); // State لتخزين الصورة
//     const [imageError, setImageError] = useState(""); // State لعرض خطأ الصورة
//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [showSnackbar, setShowSnackbar] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");
//     const [alertVariant, setAlertVariant] = useState("danger");
//     const history = useHistory();

//     const regexPatterns = {
//         email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//         password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
//         phoneNumber: /^(010|011|012|015)\d{8}$/,
//         username: /^[a-zA-Z0-9]{5,20}$/,
//         nationalId: /^(2|3)\d{13}$/,
//         age: /^[1-9][0-9]?$|^100$/,
//     };

//     const validateField = (name, value) => {
//         if (!value) {
//             return "This field is required";
//         }

//         if (regexPatterns[name] && !regexPatterns[name].test(value)) {
//             const messages = {
//                 email: "Invalid email format",
//                 password: "Password must be at least 8 characters long, contain an uppercase, a lowercase letter, and a number.",
//                 phoneNumber: "Phone number must be 11 digits and start with 010, 011, 012, or 015.",
//                 username: "Username must be 5-20 characters long.",
//                 nationalId: "National ID must be 14 digits.",
//                 age: "Age must be a valid number between 1 and 100.",
//             };
//             return messages[name] || "Invalid input";
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });

//         let updatedErrors = { ...errors, [name]: validateField(name, value) };
//         setErrors(updatedErrors);
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setProfileImage(file);
//         setImageError(""); // مسح الخطأ عند اختيار صورة جديدة
//     };

//     const validate = () => {
//         const tempErrors = {};
//         let isValid = true;

//         // التحقق من الدور
//         if (!formData.role) {
//             tempErrors.role = "Please select a role";
//             isValid = false;
//         }

//         // التحقق من الحقول الإجبارية بغض النظر عن الدور
//         ["username", "email", "password", "phoneNumber"].forEach((key) => {
//             tempErrors[key] = validateField(key, formData[key]);
//             if (tempErrors[key]) isValid = false;
//         });

//         if (formData.role === "doctor") {
//             // التحقق من وجود الصورة للطبيب فقط
//             if (!profileImage) {
//                 setImageError("Profile image is required");
//                 isValid = false;
//             } else {
//                 setImageError("");
//             }
//         }

//         if (formData.role === "patient") {
//             // التحقق من حقول المريض فقط
//             ["nationalId", "age", "gender", "address"].forEach((key) => {
//                 tempErrors[key] = validateField(key, formData[key]);
//                 if (tempErrors[key]) isValid = false;
//             });
//         }

//         if (formData.role === "doctor") {
//             // التحقق من حقول الطبيب
//             ["specialization", "jobTitle", "clinicAddress"].forEach((key) => {
//                 if (!formData[key]) {
//                     tempErrors[key] = "This field is required";
//                     isValid = false;
//                 }
//             });
//         }

//         setErrors(tempErrors);
//         return isValid;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!validate()) return;

//         let users = JSON.parse(localStorage.getItem("clinic_data")) || [];

//         if (users.some((user) => user.username === formData.username)) {
//             setSnackbarMessage("Username already exists!");
//             setShowSnackbar(true);
//             return;
//         }

//         if (users.some((user) => user.email === formData.email)) {
//             setSnackbarMessage("Email already exists!");
//             setAlertVariant("danger");
//             setShowSnackbar(true);
//             return;
//         }

//         // إضافة الصورة إلى بيانات المستخدم
//         const userData = {
//             username: formData.username,
//             email: formData.email,
//             password: formData.password,
//             phoneNumber: formData.phoneNumber,
//             role: formData.role,
//         };

//         // إضافة الصورة فقط إذا تم اختيارها
//         if (profileImage) {
//             userData.profileImage = profileImage.name; // أو يمكنك تخزين مسار الصورة إذا كنت سترفعها إلى خادم
//         }

//         if (formData.role === "patient") {
//             userData.nationalId = formData.nationalId;
//             userData.age = formData.age;
//             userData.gender = formData.gender;
//             userData.address = formData.address;
//         } else if (formData.role === "doctor") {
//             userData.specialization = formData.specialization;
//             userData.jobTitle = formData.jobTitle;
//             userData.clinicAddress = formData.clinicAddress;
//         }

//         users.push(userData);
//         localStorage.setItem("clinic_data", JSON.stringify(users));

//         setSnackbarMessage("Account created successfully!");
//         setAlertVariant("success");
//         setShowSnackbar(true);

//         setTimeout(() => {
//             history.push("/login");
//         }, 1000);
//     };

//     return (
//         <div className="container d-flex flex-column align-items-center py-5">
//             <div className="shadow p-4" style={{ width: "500px" }}>
//                 {showSnackbar && (
//                     <div className={`alert alert-${alertVariant} alert-dismissible fade show`} role="alert">
//                         <strong>{snackbarMessage}</strong>
//                         <button type="button" className="btn-close" onClick={() => setShowSnackbar(false)}></button>
//                     </div>
//                 )}
//                 <Title titleName="Register" />
//                 <form onSubmit={handleSubmit}>

//                     <div className="mb-3">
//                         <label className="form-label">Role</label>
//                         <select className={`form-select ${errors.role ? "is-invalid" : ""}`} name="role" value={formData.role} onChange={handleChange}>
//                             <option value="">Select Role</option>
//                             <option value="patient">Patient</option>
//                             <option value="doctor">Doctor</option>
//                         </select>
//                         {errors.role && <div className="invalid-feedback">{errors.role}</div>}
//                     </div>

//                     <InputField label="Username" type="text" name="username" value={formData.username} onChange={handleChange} isInvalid={Boolean(errors.username)} feedback={errors.username} />

//                     <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={Boolean(errors.email)} feedback={errors.email} />

//                     <InputField label="Password" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} isInvalid={Boolean(errors.password)} feedback={errors.password} showPasswordToggle={true} onPasswordToggle={() => setShowPassword(!showPassword)} />

//                     <InputField label="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} isInvalid={Boolean(errors.phoneNumber)} feedback={errors.phoneNumber} />

//                     {formData.role === "patient" && (
//                         <>
//                             <InputField label="National ID" type="text" name="nationalId" value={formData.nationalId} onChange={handleChange} isInvalid={Boolean(errors.nationalId)} feedback={errors.nationalId} />

//                             <InputField label="Age" type="number" name="age" value={formData.age} onChange={handleChange} isInvalid={Boolean(errors.age)} feedback={errors.age} />

//                             <div className="mb-3">
//                                 <label className="form-label">Gender</label>
//                                 <select className={`form-select ${errors.gender ? "is-invalid" : ""}`} name="gender" value={formData.gender} onChange={handleChange}>
//                                     <option value="">Select Gender</option>
//                                     <option value="male">Male</option>
//                                     <option value="female">Female</option>
//                                 </select>
//                                 {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
//                             </div>

//                             <InputField label="Address" type="text" name="address" value={formData.address} onChange={handleChange} isInvalid={Boolean(errors.address)} feedback={errors.address} />
//                         </>
//                     )}

//                     {formData.role === "doctor" && (
//                         <>
//                             <InputField label="Specialization" type="text" name="specialization" value={formData.specialization} onChange={handleChange} isInvalid={Boolean(errors.specialization)} feedback={errors.specialization} />

//                             <InputField label="Job Title" type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} isInvalid={Boolean(errors.jobTitle)} feedback={errors.jobTitle} />

//                             <InputField label="Clinic Address" type="text" name="clinicAddress" value={formData.clinicAddress} onChange={handleChange} isInvalid={Boolean(errors.clinicAddress)} feedback={errors.clinicAddress} />
//                         </>
//                     )}

//                     <div className="mb-3">
//                         <label htmlFor="profileImage" className="form-label">Profile Image</label>
//                         <input
//                             type="file"
//                             className={`form-control ${imageError ? "is-invalid" : ""}`}
//                             id="profileImage"
//                             name="profileImage"
//                             onChange={handleImageChange}
//                             accept="image/*" // لقبول الصور فقط
//                             required={formData.role === "doctor"} // إلزامي للطبيب فقط
//                         />
//                         {imageError && <div className="invalid-feedback">{imageError}</div>}
//                     </div>

//                     <button type="submit" className="btn btn-primary w-100 mt-3 fw-bold fs-3">Register</button>
//                 </form>
//                 <div className="d-flex align-items-center my-3">
//                     <hr className="flex-grow-1" />
//                     <span className="mx-3">I don't have an account</span>
//                     <hr className="flex-grow-1" />
//                 </div>
//                 <Link to="/login" className="btn btn-light w-100 border fw-bold fs-5 text-dark text-decoration-none fw-bold fs-4">
//                     Login
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
// };

// export default Register;
>>>>>>> main

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputField from "./Input";
import { useHistory, Link } from "react-router-dom";
import Title from "./Title";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        nationalId: "",
<<<<<<< HEAD
        role: "patient",
=======
        role: "", // الدور يجب أن يكون إجباريًا
        age: "",
>>>>>>> main
        gender: "",
        birthdate: "",
        address: "",
        phoneNumber: "",
        specialization: "", // التخصص
        jobTitle: "", // الدرجة الوظيفية
        clinicAddress: "", // عنوان العيادة
    });
    const [profileImage, setProfileImage] = useState(null); // State لتخزين الصورة
    const [imageError, setImageError] = useState(""); // State لعرض خطأ الصورة
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("danger");
     const history = useHistory();

    const regexPatterns = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        phoneNumber: /^(010|011|012|015)\d{8}$/,
        username: /^[a-zA-Z0-9]{5,20}$/,
<<<<<<< HEAD
        nationalId: /^(2|3)\d{13}$/
=======
        nationalId: /^(2|3)\d{13}$/,
        age: /^[1-9][0-9]?$|^100$/,
>>>>>>> main
    };
    const validateField = (name, value) => {
        console.log(`Validating field: ${name}, value: ${value}`);
    
        // تعريف الحقول المطلوبة لكل دور
        const requiredFields = {
            patient: ['username', 'email', 'password', 'nationalId', 'gender', 'birthdate', 'address', 'phoneNumber'],
            doctor: ['username', 'email', 'password', 'nationalId']
        };
    
        // التحقق مما إذا كان الحقل مطلوبًا للدور الحالي
        if (requiredFields[formData.role].includes(name) && !value) {
            console.log("Field is required");
            return "This field is required";
        }
    
        // إذا لم يكن الحقل مطلوبًا أو كانت له قيمة، فقم بالتحقق من صحة النمط
        if (value && regexPatterns[name] && !regexPatterns[name].test(value)) {
            console.log("Regex validation failed");
            switch (name) {
                case "email":
                    return "Invalid email format";
                case "password":
                    return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number";
                case "phoneNumber":
                    return "Phone number should contain 11 digits and start with 010, 011, 012, or 015";
                case "username":
                    return "Username should contain from 5 to 20 characters";
                case "nationalId":
                    return "National ID should contain 14 digits";
                default:
                    return undefined; // Return undefined for no error
            }
        }
    
        console.log("Field is valid");
        return undefined; // Return undefined for no error
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Validate the field immediately on change
        const error = validateField(name, value);
        setFormData({ ...formData, [name]: value });
<<<<<<< HEAD
        setErrors({ ...errors, [name]: error });
    };


    const validate = () => {
        const tempErrors = {};
        Object.keys(formData).forEach((key) => {
            tempErrors[key] = validateField(key, formData[key]);
            console.log(`Field: ${key}, Error: ${tempErrors[key]}`);
        });
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === undefined);
=======

        let updatedErrors = { ...errors, [name]: validateField(name, value) };
        setErrors(updatedErrors);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // تخزين الصورة كـ Base64
                setImageError("");
            };
            reader.readAsDataURL(file);
        } else {
            setProfileImage(null);
        }
    };

    const validate = () => {
        const tempErrors = {};
        let isValid = true;

        // التحقق من الدور
        if (!formData.role) {
            tempErrors.role = "Please select a role";
            isValid = false;
        }

        // التحقق من الحقول الإجبارية بغض النظر عن الدور
        ["username", "email", "password", "phoneNumber"].forEach((key) => {
            tempErrors[key] = validateField(key, formData[key]);
            if (tempErrors[key]) isValid = false;
        });

        if (formData.role === "doctor") {
            // التحقق من وجود الصورة للطبيب فقط
            if (!profileImage) {
                setImageError("Profile image is required");
                isValid = false;
            } else {
                setImageError("");
            }
        }

        if (formData.role === "patient") {
            // التحقق من حقول المريض فقط
            ["nationalId", "age", "gender", "address"].forEach((key) => {
                tempErrors[key] = validateField(key, formData[key]);
                if (tempErrors[key]) isValid = false;
            });
        }

        if (formData.role === "doctor") {
            // التحقق من حقول الطبيب
            ["specialization", "jobTitle", "clinicAddress"].forEach((key) => {
                if (!formData[key]) {
                    tempErrors[key] = "This field is required";
                    isValid = false;
                }
            });
        }

        setErrors(tempErrors);
        return isValid;
>>>>>>> main
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit called");
        if (!validate()) {
            console.log("Validation failed");
            return;
        }
        console.log("Validation passed");
    
        let users = JSON.parse(localStorage.getItem("clinic_data")) || [];
        console.log("Existing users:", users);
    
        const { username, email } = formData;
    
        if (users.some(user => user.username === username)) {
            setSnackbarMessage("Username already exists!");
            setAlertVariant("danger");
            setShowSnackbar(true);
            return;
        }
<<<<<<< HEAD
    
        if (users.some(user => user.email === email)) {
=======

        if (users.some((user) => user.email === formData.email)) {
>>>>>>> main
            setSnackbarMessage("Email already exists!");
            setAlertVariant("danger");
            setShowSnackbar(true);
            return;
        }
<<<<<<< HEAD
    
        const { ...userData } = formData;
=======

        // إضافة الصورة إلى بيانات المستخدم
        const userData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            role: formData.role,
        };

        if (profileImage) {
            userData.profileImage = profileImage; // تخزين الصورة كـ Base64
        }

        if (formData.role === "patient") {
            userData.nationalId = formData.nationalId;
            userData.age = formData.age;
            userData.gender = formData.gender;
            userData.address = formData.address;
        } else if (formData.role === "doctor") {
            userData.specialization = formData.specialization;
            userData.jobTitle = formData.jobTitle;
            userData.clinicAddress = formData.clinicAddress;
        }

>>>>>>> main
        users.push(userData);
        console.log("Updated users:", users);
        localStorage.setItem("clinic_data", JSON.stringify(users));
        console.log("Data saved to localStorage");
    
        setSnackbarMessage("Account created successfully!");
        setAlertVariant("success");
        setShowSnackbar(true);
    
        setTimeout(() => {
<<<<<<< HEAD
        
            // console.log(localStorage.getItem("clinic_data"));
            history.push("/login");
        }, 1000);
=======
            history.push("/login");
        }, 500);
>>>>>>> main
    };

    return (
        <div className="container d-flex flex-column align-items-center py-5">
            <div className="shadow p-4" style={{ width: "500px" }}>
                {showSnackbar && (
                    <div className={`alert alert-${alertVariant} alert-dismissible fade show`} role="alert">
                        <strong>{snackbarMessage}</strong>
                        <button type="button" className="btn-close" onClick={() => setShowSnackbar(false)}></button>
                    </div>
                )}
                <Title titleName="Register" />
                <form onSubmit={handleSubmit}>

<<<<<<< HEAD
                    <InputField
                        label="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        isInvalid={Boolean(errors.username)}
                        feedback={errors.username}
                    />
=======
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select className={`form-select ${errors.role ? "is-invalid" : ""}`} name="role" value={formData.role} onChange={handleChange}>
                            <option value="">Select Role</option>
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                        </select>
                        {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                    </div>

                    <InputField label="Username" type="text" name="username" value={formData.username} onChange={handleChange} isInvalid={Boolean(errors.username)} feedback={errors.username} />
>>>>>>> main

                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={Boolean(errors.email)}
                        feedback={errors.email}
                    />

                    <InputField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={Boolean(errors.password)}
                        feedback={errors.password}
                        showPasswordToggle={true}
                        onPasswordToggle={() => setShowPassword(!showPassword)}
                    />

<<<<<<< HEAD
                    <InputField
                        label="National ID"
                        type="text"
                        name="nationalId"
                        value={formData.nationalId}
                        onChange={handleChange}
                        isInvalid={Boolean(errors.nationalId)}
                        feedback={errors.nationalId}
                    />

                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                            className="form-select"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                        </select>
                    </div>

                    {formData.role === "patient" && (
                        <>
=======
                    <InputField label="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} isInvalid={Boolean(errors.phoneNumber)} feedback={errors.phoneNumber} />

                    {formData.role === "patient" && (
                        <>
                            <InputField label="National ID" type="text" name="nationalId" value={formData.nationalId} onChange={handleChange} isInvalid={Boolean(errors.nationalId)} feedback={errors.nationalId} />

                            <InputField label="Age" type="number" name="age" value={formData.age} onChange={handleChange} isInvalid={Boolean(errors.age)} feedback={errors.age} />

>>>>>>> main
                            <div className="mb-3">
                                <label className="form-label">Gender</label>
                                <select
                                    className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                            </div>

<<<<<<< HEAD
                            <InputField
                                label="Birthdate"
                                type="date"
                                name="birthdate"
                                isInvalid={Boolean(errors.birthdate)}
                                feedback={errors.birthdate}
                                value={formData.birthdate}
                                onChange={handleChange}
                            />

                            <InputField
                                label="Address"
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                isInvalid={Boolean(errors.address)}
                                feedback={errors.address}
                            />

                            <InputField
                                label="Phone Number"
                                type="tel"
                                isInvalid={Boolean(errors.phoneNumber)}
                                feedback={errors.phoneNumber}
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </>
                    )}

<button
    type="submit"
    className="btn btn-primary w-100 mt-3 fw-bold fs-3"
    disabled={Object.values(errors).some(x => x !== undefined)}
>
    Register
</button>
                </form>
                <div className="d-flex align-items-center my-3">
                    <hr className="flex-grow-1" />
                    <span className="mx-3">Already have an account?</span>
                    <hr className="flex-grow-1" />
                </div>
                <Link to="/login" className="btn btn-light w-100 border fw-bold fs-5 text-dark text-decoration-none fw-bold fs-4">
                    Log In
=======
                            <InputField label="Address" type="text" name="address" value={formData.address} onChange={handleChange} isInvalid={Boolean(errors.address)} feedback={errors.address} />
                        </>
                    )}

                    {formData.role === "doctor" && (
                        <>
                            <InputField label="Specialization" type="text" name="specialization" value={formData.specialization} onChange={handleChange} isInvalid={Boolean(errors.specialization)} feedback={errors.specialization} />

                            <InputField label="Job Title" type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} isInvalid={Boolean(errors.jobTitle)} feedback={errors.jobTitle} />

                            <InputField label="Clinic Address" type="text" name="clinicAddress" value={formData.clinicAddress} onChange={handleChange} isInvalid={Boolean(errors.clinicAddress)} feedback={errors.clinicAddress} />
                        </>
                    )}

                    <div className="mb-3">
                        <label htmlFor="profileImage" className="form-label">Profile Image</label>
                        <input
                            type="file"
                            className={`form-control ${imageError ? "is-invalid" : ""}`}
                            id="profileImage"
                            name="profileImage"
                            onChange={handleImageChange}
                            accept="image/*" // لقبول الصور فقط
                            required={formData.role === "doctor"} // إلزامي للطبيب فقط
                        />
                        {imageError && <div className="invalid-feedback">{imageError}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-3 fw-bold fs-3">Register</button>
                </form>
                <div className="d-flex align-items-center my-3">
                    <hr className="flex-grow-1" />
                    <span className="mx-3">I don't have an account</span>
                    <hr className="flex-grow-1" />
                </div>
                <Link to="/login" className="btn btn-light w-100 border fw-bold fs-5 text-dark text-decoration-none fw-bold fs-4">
                    Login
>>>>>>> main
                </Link>
                <div className="text-center mt-4" style={{ fontSize: '12px' }}>
                    <a href="#" className="text-decoration-none me-3">Conditions of Use</a>
                    <a href="#" className="text-decoration-none me-3">Notice of Use</a>
                    <a href="#" className="text-decoration-none">Help</a>
                    <p className="mt-2 text-muted">© 1996-2024, Clinic.com, Inc. or its affiliates</p>
                </div>
            </div>
<<<<<<< HEAD
=======

>>>>>>> main
        </div>
    );
};

export default Register;