

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
        let newerrors = "";
        if (!value) {
            return "this field is required"
        }
        if (regexPatterns[name] && !regexPatterns[name].test(value)) {
            switch (name) {
                case "email":
                    newerrors = "Invalid email format";
                    break;
                case "password":
                    newerrors = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number";
                    break;

                case "phoneNumber":
                    newerrors = "phone should contain 14 char"
                    break;
                case "username":
                    newerrors = "user name should contain from 5 to 20 char";
                    break;
                case "nationalId":
                    newerrors = "nationalId should contain 14 char"
                    break;
                default:
                    break;
            }
            return newerrors
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
        let updatedErrors = { ...errors, [name]: validateField(name, value) };
        setErrors(updatedErrors)

    };

    const validate = () => {
        const tempErrors = {};
        Object.keys(formData).forEach((key) => {
            tempErrors[key] = validateField(key, formData[key]);
        });

        setErrors(tempErrors);
        return Object.keys(tempErrors).every((key) => !tempErrors[key]);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;



        let users = JSON.parse(localStorage.getItem("clinic_data")) || [];
        console.log("Stored users:", users);
        const { confirmPassword, ...userData } = formData;


        if (users.some(user => user.username === formData.username)) {
            setSnackbarMessage("Username already exists!");
            setShowSnackbar(true);
            return;
        }
        if (users.some(user => user.email === formData.email)) {
            setSnackbarMessage("Email already exists!");
            setAlertVariant("danger");
            setShowSnackbar(true);
            return;
        }

        users.push(userData);
        localStorage.setItem("clinic_data", JSON.stringify(users));

        setSnackbarMessage("Account created successful!...");
        setAlertVariant("success");
        setShowSnackbar(true);

        setTimeout(() => {
            history.push("/");
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
                            required
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
                                    required
                                    isInvalid={Boolean(errors.gender)}
                                    feedback={errors.gender}
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

                    <button type="submit" className="btn btn-primary w-100 mt-3 fw-bold fs-3">
                        Register
                    </button>
                </form>
                <div className="d-flex align-items-center my-3">
                    <hr className="flex-grow-1" />
                    <span className="mx-3">I don't have an account</span>
                    <hr className="flex-grow-1" />
                </div>
                <Link to="/Register" className="btn btn-light w-100 border fw-bold fs-5 text-dark text-decoration-none fw-bold fs-4">
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
