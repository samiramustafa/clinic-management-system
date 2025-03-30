import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../component/Input";
import Title from "../component/Title";

import { useHistory } from "react-router-dom";
// import "../css/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    phone_number: "",
    email:"",
    role: "patient",
    city: "",
    area: "",
    national_id: "",
    password: "",
    speciality: "",
    gender: "", 
    date_of_birth: "", // ✅ إضافة تاريخ الميلاد للمريض
    image: null, // ✅ إضافة صورة للطبيب
  });

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/clinic/api/cities/")
      .then(response => {
       
        setCities(response.data);
      })
      .catch(err => {
        console.error("Error fetching cities:", err);
      });
  }, []);

  useEffect(() => {
    if (formData.city) {
      console.log("Selected City:", formData.city);
      setAreas([]);
      axios.get(`http://127.0.0.1:8000/clinic/api/areas/?city=${formData.city}`)
        .then(response => {
          console.log("Areas Data:", response.data);
          setAreas(response.data);
        })
        .catch(err => {
          console.error("Error fetching areas:", err);
        });
    }
  }, [formData.city]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post("http://127.0.0.1:8000/clinic/api/users/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setSuccess("Registration successful!");
     
      window.location.href = "/login"; // Redirect to the login page after successful registration
      

    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div  className="container" style={{ maxWidth: "400px", marginTop: "100px" }}>
     
      <Title titleName="Register" />
      {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <InputField type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <InputField type="text" name="full_name" placeholder="Full Name" onChange={handleChange} required />
        <InputField type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
        <InputField type="email" name="email" placeholder="Email" onChange={handleChange} required />

        <div className="mb-3">
      <label className="form-label">Role</label>
      <select name="role" className="form-select" onChange={handleChange} required>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
    </div>
    
    {/* Patient Fields */}
    {formData.role === "patient" && (
      <>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select name="gender" className="form-select" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input type="date" name="date_of_birth" className="form-control" onChange={handleChange} required />
        </div>
      </>
    )}
      
    <div className="mb-3">
      <label className="form-label">City</label>
      <select name="city" className="form-select" onChange={handleChange} required>
        <option value="">Select City</option>
        {cities.length > 0 ? cities.map(city => (
          <option key={city.id} value={city.id}>{city.name}</option>
        )) : <option disabled>Loading cities...</option>}
      </select>
    </div>
          {/* Area Selection */}
    <div className="mb-3">
      <label className="form-label">Area</label>
      <select name="area" className="form-select" onChange={handleChange} required>
        <option value="">Select Area</option>
        {areas.length > 0 ? areas.map(area => (
          <option key={area.id} value={area.id}>{area.name}</option>
        )) : <option disabled>Select a city first</option>}
      </select>
    </div>
        <InputField type="text" name="national_id" placeholder="National ID" onChange={handleChange} required />
        <InputField type="password" name="password" placeholder="Password" onChange={handleChange} required />
        {formData.role === "doctor" && (
          <>
            <InputField type="text" name="speciality" placeholder="Speciality" onChange={handleChange} />
            <InputField type="file" name="image" accept="image/*" onChange={handleChange} />
          </>
        )}
        <button className="btn btn-primary w-100" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
