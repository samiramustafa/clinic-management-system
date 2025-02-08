import React, { useState } from "react";
import Title from "./Input";
import Input from "./Input";

function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username is required and cannot be just spaces";
        } else if (formData.username.length <= 3) {
            newErrors.username = "Username must be more than 3 characters";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required and cannot be just spaces";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validate();

        if (!errors.username && !errors.password) {
            console.log("Logging in with:", formData);
        }
    };

    return (
        <div className="container" style={{ maxWidth: "400px", marginTop: "100px" }}>
            <Title titleName="Log In" />
            <form onSubmit={handleSubmit}>
                <Input
                    htmlFor="username"
                    type="text"
                    onChange={handleChange}
                    labelName="Username"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                />
                {errors.username && <div className="text-danger">{errors.username}</div>}

                <Input
                    htmlFor="password"
                    type="password"
                    onChange={handleChange}
                    labelName="Password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}

                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
}

export default Login;
