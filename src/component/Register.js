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
        role: "patient",
        gender: "",
        birthdate: "",
        address: "",
        phoneNumber: "",
    });

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
        nationalId: /^(2|3)\d{13}$/
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
    
        if (users.some(user => user.email === email)) {
            setSnackbarMessage("Email already exists!");
            setAlertVariant("danger");
            setShowSnackbar(true);
            return;
        }
    
        const { ...userData } = formData;
        users.push(userData);
        console.log("Updated users:", users);
        localStorage.setItem("clinic_data", JSON.stringify(users));
        console.log("Data saved to localStorage");
    
        setSnackbarMessage("Account created successfully!");
        setAlertVariant("success");
        setShowSnackbar(true);
    
        setTimeout(() => {
        
            // console.log(localStorage.getItem("clinic_data"));
            history.push("/login");
        }, 1000);
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

                    <InputField
                        label="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        isInvalid={Boolean(errors.username)}
                        feedback={errors.username}
                    />

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