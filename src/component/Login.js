

import React, { useState } from "react";
import Title from "./Title";
import InputField from "./Input";
import { useHistory, Link } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
    };
    const validateField = (name, value) => {
        let newErrors = "";

        if (!value) {
            return "this field is required";
        }
        if (regexPatterns[name] && !regexPatterns[name].test(value)) {
            switch (name) {
                case "email":
                    newErrors = "Invalid email format";
                    break;
                case "password":
                    newErrors = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number";
                    break;
                default:
                    break;
            }
            return newErrors;
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });

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

        const users = JSON.parse(localStorage.getItem("clinic_data")) || [];

        const user = users.find(
            (user) => user.email === formData.email && user.password === formData.password
        );

        if (!user) {
            setSnackbarMessage("Invalid email or password! Please try again.");
            setAlertVariant("danger");
            setShowSnackbar(true);
            return;
           
        }

        localStorage.setItem("loginSession", JSON.stringify({ username: user.username, isAdmin: user.isAdmin }));

        setSnackbarMessage("Login successful! Redirecting...");
        setAlertVariant("success");
        setShowSnackbar(true);

        setTimeout(() => {
            history.push("/");
        }, 1000);
    };


    return (
        <div className="d-flex flex-column align-items-center py-5">
            <div className="shadow p-4" style={{ width: "500px" }}>
            {showSnackbar && (
                    <div className={`alert alert-${alertVariant} alert-dismissible fade show`} role="alert">
                        <strong>{snackbarMessage}</strong>
                        <button type="button" className="btn-close" onClick={() => setShowSnackbar(false)}></button>
                    </div>
                )}
                <Title titleName="Log In" />
                <form onSubmit={handleSubmit}>

                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={Boolean(errors.email)}
                        feedback={errors.email}
                        placeholder="Enter your email"
                    />


                    <InputField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={Boolean(errors.password)}
                        feedback={errors.password}
                        placeholder="Enter your password"
                        showPasswordToggle
                        onPasswordToggle={() => setShowPassword(!showPassword)}
                    />

                    <button variant="primary" type="submit" className="btn btn-primary w-100 mt-3 fw-bold fs-3">Login</button>
                </form>
                <div className="d-flex align-items-center my-3">
                    <hr className="flex-grow-1" />
                    <span className="mx-3">I don't have an account</span>
                    <hr className="flex-grow-1" />
                </div>
                <Link to="/Register" className="btn btn-light w-100 border fw-bold fs-5 text-dark text-decoration-none">
                    Create your account
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
}

export default Login;

