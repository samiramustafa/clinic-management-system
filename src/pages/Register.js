import React, { useState, useEffect } from "react";
import egyptData from "./egyptdata.json";
 // Import your JSON file

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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Load cities from JSON
    const cityNames = egyptData.map((item) => ({ name: item.city }));
    setCities(cityNames);
  }, []);

  useEffect(() => {
    if (formData.city) {
      // Find areas for the selected city from JSON
      const selectedCityData = egyptData.find((item) => item.city === formData.city);
      setAreas(selectedCityData ? selectedCityData.areas : []);
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
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      // Simulated post request (replace with your actual API endpoint)
      console.log("Sending Data:", Object.fromEntries(formDataToSend));
      setSuccess("Registration successful!");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "40px auto",
      padding: "20px",
      backgroundColor: "#ffffff",
      border: "1px solid #dce2f0",
      borderRadius: "8px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      color: "#0056b3",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #dce2f0",
      borderRadius: "4px",
      fontSize: "16px",
    },
    button: {
      backgroundColor: "#0056b3",
      color: "white",
      padding: "12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      width: "100%",
      fontSize: "16px",
      marginTop: "10px",
    },
    message: {
      margin: "10px 0",
      fontSize: "14px",
    },
    error: {
      color: "#e63946",
    },
    success: {
      color: "#2a9d8f",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      {error && (
        <p style={{ ...styles.message, ...styles.error }}>
          {error}
        </p>
      )}
      {success && (
        <p style={{ ...styles.message, ...styles.success }}>{success}</p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="text"
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <select
          style={styles.input}
          name="role"
          onChange={handleChange}
          required
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        {formData.role === "patient" && (
          <>
            <select
              style={styles.input}
              name="gender"
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              style={styles.input}
              type="date"
              name="date_of_birth"
              onChange={handleChange}
              required
            />
          </>
        )}
        <select
          style={styles.input}
          name="city"
          onChange={handleChange}
          required
        >
          <option value="">Select City</option>
          {cities.length > 0 ? (
            cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            ))
          ) : (
            <option disabled>Loading cities...</option>
          )}
        </select>
        <select
          style={styles.input}
          name="area"
          onChange={handleChange}
          required
        >
          <option value="">Select Area</option>
          {areas.length > 0 ? (
            areas.map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))
          ) : (
            <option disabled>Select a city first</option>
          )}
        </select>
        <input
          style={styles.input}
          type="text"
          name="national_id"
          placeholder="National ID"
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        {formData.role === "doctor" && (
          <>
            <input
              style={styles.input}
              type="text"
              name="speciality"
              placeholder="Speciality"
              onChange={handleChange}
            />
            <input
              style={styles.input}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </>
        )}
        <button style={styles.button} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;