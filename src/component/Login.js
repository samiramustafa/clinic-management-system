import { useState } from "react";
import axios from "axios";
import InputField from "../component/Input";
import Title from "../component/Title";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/clinic/api/token/", formData);

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      window.location.href = "/"; // Redirect to the dashboard page
      localStorage.setItem("user_role", response.data.role); // تخزين دور المستخدم
      window.dispatchEvent(new Event("authChange")); // إرسال حدث تحديث

      setSuccess("Login successful!");
    } catch (err) {
      setErrors(err.response?.data || "Invalid username or password");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "100px" }}>
      <Title titleName="Login" />
      {/* {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form> */}
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

        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    
    </div>
  );
};

export default Login;
