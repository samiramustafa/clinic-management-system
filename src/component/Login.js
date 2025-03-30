import { useState } from "react";
import axios from "axios";
import InputField from "../component/Input";
import Title from "../component/Title";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

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
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors
    setSuccess(null); // Reset success message

    if (!validate()) return; // Stop submission if validation fails

    try {
      const response = await axios.post("http://127.0.0.1:8000/clinic/api/token/", formData);

      // Save tokens to localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("user_role", response.data.role);

      // Trigger authentication update and redirect
      window.dispatchEvent(new Event("authChange"));
      window.location.href = "/";

      setSuccess("Login successful!");
    } catch (err) {
      // Handle API errors gracefully
      setErrors({
        form: err.response?.data?.detail || "Invalid username or password",
      });
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "100px" }}>
      <Title text="Login" />
      {success && <div className="text-success">{success}</div>}
      {errors.form && <div className="text-danger">{errors.form}</div>}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {errors.username && <div className="text-danger">{errors.username}</div>}
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <div className="text-danger">{errors.password}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;