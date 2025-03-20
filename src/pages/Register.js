
import React, { useState } from "react";
import axios from "axios";
import InputField from "../component/Input";
import { useHistory, Link } from "react-router-dom";
import Title from "../component/Title";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        national_id:"",
        email: "",
        phoneNumber: "",
        gender: "",
        birth_date: "",
        role: "",
        specialization: "",
        clinicAddress: "",
        address: "",
    });
    const [errors, setErrors] = useState({});
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [alertVariant, setAlertVariant] = useState("danger");
    const history = useHistory();

    const regexPatterns = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        phoneNumber: /^(010|011|012|015)\d{8}$/,
        username: /^[a-zA-Z0-9]{5,20}$/,
        nationalId: /^\d{14}$/,
        name: /^[a-zA-Z\s]+$/,
        birth_date: /^\d{4}-\d{2}-\d{2}$/,
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); 
        let validationErrors = { ...errors }; 

        if (!value) {
            validationErrors[name] = "This field is required"; 
        } else {
            delete validationErrors[name];
        }
    
        if (name === "username" && !regexPatterns.username.test(value)) {
          validationErrors.username =
            "Username must be 5-20 characters long (letters and numbers only).";
        } else {
          delete validationErrors.username; 
        }
    
        if (name === "email" && !regexPatterns.email.test(value)) {
          validationErrors.email = "Invalid email format.";
        } else {
          delete validationErrors.email;
        }
    
        if (name === "password" && !regexPatterns.password.test(value)) {
          validationErrors.password =
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
        } else {
          delete validationErrors.password;
        }
    
        if (name === "phoneNumber" && !regexPatterns.phoneNumber.test(value)) {
          validationErrors.phoneNumber =
            "Phone number must start with 010, 011, 012, or 015 and be 11 digits long.";
        } else {
          delete validationErrors.phoneNumber;
        }
    
        if (name === "national_id" && !regexPatterns.nationalId.test(value)) {
          validationErrors.national_id = "National ID must be exactly 14 digits.";
        } else {
          delete validationErrors.national_id;
        }
    
        if (name === "name" && !regexPatterns.name.test(value)) {
          validationErrors.name = "Name must contain only letters and spaces.";
        } else {
          delete validationErrors.name;
        }
    
        if (name === "gender" && (!value || (value !== "M" && value !== "F"))) {
          validationErrors.gender = "Please select a valid gender.";
        } else {
          delete validationErrors.gender;
        }
    
    
        if (name === "birth_date" && !regexPatterns.birth_date.test(value)) {
          validationErrors.birth_date = "Date must be in YYYY-MM-DD format.";
        } else {
          delete validationErrors.birth_date;
        }
    
    
        if (name === "role" && !value) {
          validationErrors.role = "Role selection is required.";
        } else {
          delete validationErrors.role;
        }
    
        setErrors(validationErrors);
      };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setShowSnackbar(true);
            setSnackbarMessage("Please fix the errors in the form.");
            setAlertVariant("warning");
            return;
          }

    
        const userData = {
                username: formData.username,
                password: formData.password,
                name: formData.name,
                national_id: formData.national_id,
                email: formData.email,
                mobile_phone: formData.phoneNumber, 
                gender: formData.gender ,
                birth_date: formData.birth_date ,
                role: formData.role,
                
        };
        
    
        try {
            const response = await axios.post("http://127.0.0.1:8000/clinic/users/", userData, {
                headers: { "Content-Type": "application/json" },
        });
        
        if (formData.role === "doctor") {
            await axios.post("http://127.0.0.1:8000/clinic/doctors/", {
                user: response.data.id, 
                specialization: formData.specialization,
                clinicAddress: formData.clinicAddress
            }, {
                headers: { "Content-Type": "application/json" },
            });
        } else if (formData.role === "patient") {
            await axios.post("http://127.0.0.1:8000/clinic/patients/", {
                user: response.data.id, 
                address: formData.address
            }, {
                headers: { "Content-Type": "application/json" },
            });
        }
    
            setShowSnackbar(true);
            setSnackbarMessage("Registration successful!");
            setAlertVariant("success");
            history.push("/login");
        } catch (error) {
            console.error("Error Response:", error.response?.data || error.message);
            setShowSnackbar(true);
            setSnackbarMessage("Registration failed!");
            setAlertVariant("danger");
        }
        
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
        
                            <InputField
                                label="Phone Number" 
                                type="tel" name="phoneNumber" 
                                value={formData.phoneNumber} 
                                onChange={handleChange} 
                                isInvalid={Boolean(errors.phoneNumber)} 
                                feedback={errors.phoneNumber} 
                            />

                            <InputField 
                                label="National ID" 
                                type="text" name="national_id" 
                                value={formData.national_id} 
                                onChange={handleChange} 
                                isInvalid={Boolean(errors.national_id)} 
                                feedback={errors.national_id} 
                            />

                            <InputField 
                                label="Name" 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                isInvalid={Boolean(errors.name)} 
                                feedback={errors.name} 
                            />

                            <InputField 
                                label="Birth Date" 
                                type="text" 
                                name="birth_date" 
                                value={formData.birth_date} 
                                onChange={handleChange} 
                                isInvalid={Boolean(errors.birth_date)} 
                                feedback={errors.birth_date} 
                            />

                            <label className="form-label">Gender</label>
                                        <select
                                            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                        
                            {formData.role === "patient" && (
                                <>
                                    <div className="mb-3">
                                    <InputField 
                                        label="Address" 
                                        type="text" 
                                        name="address" 
                                        value={formData.address} 
                                        onChange={handleChange} 
                                        isInvalid={Boolean(errors.address)} 
                                        feedback={errors.address} 
                                    />
                                    </div>
                                </>
                            )} 
        
                            {formData.role === "doctor" && (
                                <>
                                 <div className="mb-3">
                                    <InputField 
                                        label="Specialization" 
                                        type="text" 
                                        name="specialization" 
                                        value={formData.specialization} 
                                        onChange={handleChange} 
                                        isInvalid={Boolean(errors.specialization)} 
                                        feedback={errors.specialization} />
        
        
                                    <InputField 
                                        label="Clinic Address" 
                                        type="text" 
                                        name="clinicAddress" 
                                        value={formData.clinicAddress} 
                                        onChange={handleChange} 
                                        isInvalid={Boolean(errors.clinicAddress)} 
                                        feedback={errors.clinicAddress} 
                                        />
                                    </div>
                                    </>
                                )} 
        
                    
        
                            <button type="submit" className="btn btn-primary w-100 mt-3 fw-bold fs-3">Register</button>
                        </form>
                        <div className="d-flex align-items-center my-3">
                            <hr className="flex-grow-1" />
                            <span className="mx-3">I don't have an account</span>
                            <hr className="flex-grow-1" />
                        </div>
                        <Link to="/login" className="btn btn-light w-100 border fw-bold fs-5 text-dark text-decoration-none fw-bold fs-4">
                            Login
                        </Link>
                        <div className="text-center mt-4" style={{ fontSize: '12px' }}>
                            <a href="#" className="text-decoration-none me-3">Conditions of Use</a>
                            <a href="#" className="text-decoration-none me-3">Notice of Use</a>
                            <a href="#" className="text-decoration-none">Help</a>
                            <p className="mt-2 text-muted">© 1996-2024, Clinic.com, Inc. or its affiliates</p>
                        </div>
                    </div>
                </div>
    );
};

export default Register;
