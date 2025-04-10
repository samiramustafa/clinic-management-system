
import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../component/Input";
import Title from "../component/Title";

const specialitiesList = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "General Practice",
  "Ophthalmology",
  "Psychiatry",
];

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
      .get("http://127.0.0.1:8000/api/cities/")
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
        .get(`http://127.0.0.1:8000/api/areas/?city=${formData.city}`)
        .then((response) => {
          setAreas(response.data);
        })
        .catch((err) => {
          console.error("Error fetching areas:", err);
        });
    } else {
        setAreas([]);
        setFormData(prev => ({ ...prev, area: '' }));
    }
  }, [formData.city]);

  const validate = (field, value) => {
    let error = "";
    const currentDate = new Date();
    switch (field) {
      case "username":
        if (!value.trim()) error = "Username is required";
        // else if (!/^[a-zA-Z]+$/.test(value)) error = "Username must contain letters only";
        else if (value.trim().length < 3) error = "Username must be at least 3 characters long";
        break;
      case "full_name":
        if (!value.trim()) error = "Full name is required";
        else if (!/^[a-zA-Z\s]+$/.test(value)) error = "Full name must contain letters and spaces only";
        else if (value.trim().split(' ').filter(n => n !== '').length < 2) error = "Full name must consist of at least two parts";
        break;
      case "phone_number":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^\d{11}$/.test(value)) error = "Phone number must be exactly 11 digits";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) error = "Email format is invalid";
        break;
      case "city":
        if (!value) error = "City is required";
        break;
      case "area":
        if (formData.city && !value) error = "Area is required";
        break;
      case "national_id":
        if (!value.trim()) error = "National ID is required";
        else if (!/^\d{14}$/.test(value)) error = "National ID must be exactly 14 digits";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters long";
        break;
      case "gender":
        if (formData.role === "patient" && !value) error = "Gender is required";
        break;
      case "date_of_birth":
        if (formData.role === "patient" && !value) {
          error = "Date of birth is required";
        } else if (formData.role === "patient" && value) {
          const birthDate = new Date(value);
          if (birthDate > currentDate) {
            error = "Date of birth cannot be in the future";
          } else {
            let age = currentDate.getFullYear() - birthDate.getFullYear();
            const m = currentDate.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
              age--;
            }
            if (age < 18) {
              error = "You must be at least 18 years old";
            }
          }
        }
        break;
      case "speciality":
        if (formData.role === "doctor" && !value) error = "Speciality is required";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    let newValue = value;
    if (name === "phone_number" || name === "national_id") {
        newValue = value.replace(/\D/g, '');
        if (name === "phone_number" && newValue.length > 11) {
             newValue = newValue.slice(0, 11);
        }
        if (name === "national_id" && newValue.length > 14) {
            newValue = newValue.slice(0, 14);
        }
    }

    if (type === "file" && name === "image") {
      setFormData({ ...formData, image: files[0] });
      setTouched((prev) => ({ ...prev, [name]: true }));
    } else {
      setFormData({ ...formData, [name]: newValue });
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: validate(name, newValue) }));
    }

    if (name === "city") {
       setFormData(prev => ({ ...prev, area: '' }));
       setTouched(prev => ({ ...prev, area: false }));
       setErrors(prev => ({ ...prev, area: '' }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setErrors({});

    const fieldsToTouch = Object.keys(formData).filter(key => {
        if (key === 'gender' || key === 'date_of_birth') return formData.role === 'patient';
        if (key === 'speciality' || key === 'image') return formData.role === 'doctor';
        if (key === 'area' && !formData.city) return false;
        return key !== 'image';
    });

    const touchedUpdates = fieldsToTouch.reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(prevTouched => ({...prevTouched, ...touchedUpdates}));

    const newErrors = {};
    let hasErrors = false;
    Object.keys(formData).forEach((key) => {
      if ((key === 'gender' || key === 'date_of_birth') && formData.role !== 'patient') return;
      if (key === 'speciality' && formData.role !== 'doctor') return;
      if (key === 'image') return;
      if (key === 'area' && !formData.city) return;

      const error = validate(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (hasErrors) {
        console.log("Validation Errors:", newErrors);
        return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
       let shouldAppend = true;
       if ((key === 'gender' || key === 'date_of_birth') && formData.role !== 'patient') {
           shouldAppend = false;
       } else if (key === 'speciality' && formData.role !== 'doctor') {
           shouldAppend = false;
       } else if (key === 'image' && formData.role !== 'doctor') {
            shouldAppend = false;
       }

       if (shouldAppend && formData[key] !== null && formData[key] !== '' && (key !== 'image' || formData[key] instanceof File)) {
         formDataToSend.append(key, formData[key]);
       } else if (shouldAppend && key === 'image' && formData.role === 'doctor' && !formData[key]){
       }
    });


    console.log("FormData to send:", Object.fromEntries(formDataToSend.entries()));

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/", formDataToSend, {
      });
      setSuccess("Registration successful!");
       setFormData({
            username: "", full_name: "", phone_number: "", email: "", role: "patient",
            city: "", area: "", national_id: "", password: "", speciality: "",
            gender: "", date_of_birth: "", image: null,
       });
       setTouched({});
       setErrors({});
      window.location.href = "/login";
    } catch (err) {
      console.error("Registration Error:", err);
      let errorMessage = "Something went wrong during registration.";
      if (err.response) {
          console.error("Backend Response:", err.response.data);
          const backendErrors = err.response.data;
          if (typeof backendErrors === 'object' && backendErrors !== null) {
              const errorMessages = Object.entries(backendErrors).map(([field, messages]) =>
                  `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
              ).join(' | ');
               if(errorMessages) errorMessage = errorMessages;
               setErrors(prevErrors => ({...prevErrors, ...backendErrors}));
          } else if (typeof backendErrors === 'string') {
               errorMessage = backendErrors;
          }
      }
      setErrors(prevErrors => ({ ...prevErrors, general: errorMessage }));
    }
  };

  return (
    <div className="container" style={{ maxWidth: "500px", marginTop: "50px", marginBottom: "50px", padding: "30px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
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
          type="tel"
          value={formData.phone_number}
          onChange={handleChange}
          isInvalid={touched.phone_number && !!errors.phone_number}
          feedback={errors.phone_number}
          maxLength={11}
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
          <label htmlFor="roleSelect" className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>Register as</label>
          <select
            id="roleSelect"
            name="role"
            className={`form-select ${touched.role && errors.role ? "is-invalid" : touched.role ? "is-valid" : ""}`}
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {formData.role === "patient" && (
          <>
            <div className="mb-3">
              <label htmlFor="genderSelect" className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>Gender</label>
              <select
                id="genderSelect"
                name="gender"
                className={`form-select ${touched.gender && errors.gender ? "is-invalid" : touched.gender && formData.gender ? "is-valid" : ""}`}
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Gender --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {touched.gender && errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="dobInput" className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>Date of Birth</label>
              <input
                id="dobInput"
                type="date"
                name="date_of_birth"
                className={`form-control ${touched.date_of_birth && errors.date_of_birth ? "is-invalid" : touched.date_of_birth && formData.date_of_birth ? "is-valid" : ""}`}
                value={formData.date_of_birth}
                onChange={handleChange}
                 max={new Date().toISOString().split("T")[0]}
                required
              />
              {touched.date_of_birth && errors.date_of_birth && <div className="invalid-feedback">{errors.date_of_birth}</div>}
            </div>
          </>
        )}

        <div className="mb-3">
          <label htmlFor="citySelect" className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>City</label>
          <select
            id="citySelect"
            name="city"
            className={`form-select ${touched.city && errors.city ? "is-invalid" : touched.city && formData.city ? "is-valid" : ""}`}
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">-- Select City --</option>
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
          <label htmlFor="areaSelect" className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>Area</label>
          <select
            id="areaSelect"
            name="area"
            className={`form-select ${touched.area && errors.area ? "is-invalid" : touched.area && formData.area ? "is-valid" : ""}`}
            value={formData.area}
            onChange={handleChange}
            required
            disabled={!formData.city || areas.length === 0}
          >
            <option value="">-- Select Area --</option>
            {formData.city && areas.length > 0 ? (
              areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))
            ) : formData.city ? (
                 <option disabled>Loading areas...</option>
             ) : (
                 <option disabled>Select a city first</option>
            )}
          </select>
          {touched.area && errors.area && <div className="invalid-feedback">{errors.area}</div>}
        </div>

        <InputField
          label="National ID"
          name="national_id"
          type="text"
          inputMode="numeric"
          value={formData.national_id}
          onChange={handleChange}
          isInvalid={touched.national_id && !!errors.national_id}
          feedback={errors.national_id}
          maxLength={14}
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
            <div className="mb-3">
              <label htmlFor="specialitySelect" className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>Speciality</label>
              <select
                id="specialitySelect"
                name="speciality"
                className={`form-select ${touched.speciality && errors.speciality ? "is-invalid" : touched.speciality && formData.speciality ? "is-valid" : ""}`}
                value={formData.speciality}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Speciality --</option>
                {specialitiesList.map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              {touched.speciality && errors.speciality && <div className="invalid-feedback">{errors.speciality}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="imageUpload" className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>Profile Image (Optional)</label>
              <input
                id="imageUpload"
                type="file"
                name="image"
                className="form-control"
                onChange={handleChange}
                accept="image/png, image/jpeg, image/jpg"
              />
              {/* {touched.image && errors.image && <div className="invalid-feedback">{errors.image}</div>} */}
            </div>
          </>
        )}

        <button className="btn btn-primary w-100 mt-3 fw-bold" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;