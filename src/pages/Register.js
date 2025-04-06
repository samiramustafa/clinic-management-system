
import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../component/Input";
import Title from "../component/Title";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    phone_number: "",
    email: "",
    role: "patient",
    city: "",
    area: "",
    national_id: "",
    password: "",
    speciality: "",
    gender: "",
    date_of_birth: "",
    image: null,
  });

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/clinic/api/cities/")
      .then((response) => {
        setCities(response.data);
      })
      .catch((err) => {
        console.error("Error fetching cities:", err);
      });
  }, []);

  useEffect(() => {
    if (formData.city) {
      setAreas([]);
      axios
        .get(`http://127.0.0.1:8000/clinic/api/areas/?city=${formData.city}`)
        .then((response) => {
          setAreas(response.data);
        })
        .catch((err) => {
          console.error("Error fetching areas:", err);
        });
    }
  }, [formData.city]);

  const validate = (field, value) => {
    let error = "";
    switch (field) {
      case "username":
        if (!value.trim()) error = "Username is required";
        else if (value.length <= 3) error = "Username must be more than 3 characters";
        break;
      case "full_name":
        if (!value.trim()) error = "Full name is required";
        break;
      case "phone_number":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^\d{10,}$/.test(value)) error = "Phone number must be at least 10 digits";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
        break;
      case "city":
        if (!value) error = "City is required";
        break;
      case "area":
        if (!value) error = "Area is required";
        break;
      case "national_id":
        if (!value.trim()) error = "National ID is required";
        else if (!/^\d{14}$/.test(value)) error = "National ID must be 14 digits";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "gender":
        if (formData.role === "patient" && !value) error = "Gender is required";
        break;
      case "date_of_birth":
        if (formData.role === "patient" && !value) error = "Date of birth is required";
        break;
      case "speciality":
        if (formData.role === "doctor" && !value.trim()) error = "Speciality is required";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validate(name, value) }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "image") { // Skip file input validation
        newErrors[key] = validate(key, formData[key]);
      }
    });
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] && (key !== "image" || formData[key] instanceof File)) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post("http://127.0.0.1:8000/clinic/api/users/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Registration successful!");
      window.location.href = "/login";
    } catch (err) {
      setErrors(err.response?.data || { general: "Something went wrong" });
    }
  };

  return (
    <div className="container" style={{ maxWidth: "450px", marginTop: "100px", border: "4px solid #FFFFFF", 
    padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(182, 179, 179, 0.5)", backgroundColor: "#FFFFFF" }}>
      <Title titleName="Register" />
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
          required
        />
        <InputField
          label="Full Name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          isInvalid={touched.full_name && !!errors.full_name}
          feedback={errors.full_name}
          required
        />
        <InputField
          label="Phone Number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          isInvalid={touched.phone_number && !!errors.phone_number}
          feedback={errors.phone_number}
          required
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={touched.email && !!errors.email}
          feedback={errors.email}
          required
        />

        <div className="mb-3">
          <label className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>Role</label>
          <select
            name="role"
            className={`form-control ${touched.role && errors.role ? "is-invalid" : ""}`}
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          {touched.role && errors.role && <div className="invalid-feedback">{errors.role}</div>}
        </div>

        {formData.role === "patient" && (
          <>
            <div className="mb-3">
              <label className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>Gender</label>
              <select
                name="gender"
                className={`form-control ${touched.gender && errors.gender ? "is-invalid" : touched.gender ? "is-valid" : ""}`}
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {touched.gender && errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                className={`form-control ${touched.date_of_birth && errors.date_of_birth ? "is-invalid" : touched.date_of_birth ? "is-valid" : ""}`}
                value={formData.date_of_birth}
                onChange={handleChange}
                required
              />
              {touched.date_of_birth && errors.date_of_birth && <div className="invalid-feedback">{errors.date_of_birth}</div>}
            </div>
          </>
        )}

        <div className="mb-3">
          <label className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>City</label>
          <select
            name="city"
            className={`form-control ${touched.city && errors.city ? "is-invalid" : touched.city ? "is-valid" : ""}`}
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            {cities.length > 0 ? (
              cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))
            ) : (
              <option disabled>Loading cities...</option>
            )}
          </select>
          {touched.city && errors.city && <div className="invalid-feedback">{errors.city}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>Area</label>
          <select
            name="area"
            className={`form-control ${touched.area && errors.area ? "is-invalid" : touched.area ? "is-valid" : ""}`}
            value={formData.area}
            onChange={handleChange}
            required
          >
            <option value="">Select Area</option>
            {areas.length > 0 ? (
              areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))
            ) : (
              <option disabled>Select a city first</option>
            )}
          </select>
          {touched.area && errors.area && <div className="invalid-feedback">{errors.area}</div>}
        </div>

        <InputField
          label="National ID"
          name="national_id"
          value={formData.national_id}
          onChange={handleChange}
          isInvalid={touched.national_id && !!errors.national_id}
          feedback={errors.national_id}
          required
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
          required
        />

        {formData.role === "doctor" && (
          <>
            <InputField
              label="Speciality"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              isInvalid={touched.speciality && !!errors.speciality}
              feedback={errors.speciality}
              required
            />
            <div className="mb-3">
              <label className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>Profile Image</label>
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
          </>
        )}

        <button className="btn btn-primary w-100 mt-3" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;