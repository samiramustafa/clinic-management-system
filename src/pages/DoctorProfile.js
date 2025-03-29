import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      console.error("No access token found");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/clinic/api/users/me/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setFormData(response.data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://127.0.0.1:8000/clinic/api/users/me/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        alert("Profile updated successfully!");
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name || ""}
          onChange={handleChange}
        />

        {user.role === "doctor" && (
          <>
            <label>Speciality:</label>
            <input
              type="text"
              name="speciality"
              value={formData.speciality || ""}
              onChange={handleChange}
            />
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
            <label>Fees:</label>
            <input
              type="number"
              name="fees"
              value={formData.fees || ""}
              onChange={handleChange}
            />
          </>
        )}

        {user.role === "patient" && (
          <>
            <label>Birth Date:</label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date || ""}
              onChange={handleChange}
            />
            <label>Medical History:</label>
            <textarea
              name="medical_history"
              value={formData.medical_history || ""}
              onChange={handleChange}
            />
            {/* <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender || "male"}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select> */}
          </>
        )}

        <label>Phone Number:</label>
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number || ""}
          onChange={handleChange}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default DoctorProfile;
