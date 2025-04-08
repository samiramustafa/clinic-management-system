import { useState } from "react";
import axios from "axios";
import InputField from "../component/Input";
import Title from "../component/Title";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = (field, value) => {
    let error = "";
    if (field === "username") {
      if (!value.trim()) {
        error = "Username is required and cannot be just spaces";
      } else if (value.length <= 3) {
        error = "Username must be more than 3 characters";
      }
    }
    if (field === "password") {
      if (!value.trim()) {
        error = "Password is required and cannot be just spaces";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validate(name, value) }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    
    setTouched({ username: true, password: true });
    
    const newErrors = {
      username: validate("username", formData.username),
      password: validate("password", formData.password),
    };
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error)) return;

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", formData);
      
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("user_role", response.data.role);
      window.dispatchEvent(new Event("authChange"));

      setSuccess("Login successful!");
      window.location.href = "/";
    } catch (err) {
      setErrors(err.response?.data || { general: "Invalid username or password" });
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "100px" }}>
      <Title titleName="Login" />
      {success && <div className="alert alert-success">{success}</div>}
      {errors.general && <div className="alert alert-danger">{errors.general}</div>}
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          isInvalid={touched.username && !!errors.username}
          feedback={errors.username}

        />
        <InputField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          isInvalid={touched.password && !!errors.password}
          feedback={errors.password}
          showPasswordToggle={true}
          onPasswordToggle={togglePasswordVisibility}
       
        />
        <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
      </form>
    </div>
  );
};

export default Login;